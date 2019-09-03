var productPages = ["https://www.google.com/shopping/product/*"];
var searchPages = ["https://www.google.com/search*"];
var amazonPages = ['https://www.amazon.com/*dp/*'];
var specsPages = ["https://www.google.com/shopping/product/*/specs*"];

var context = ["page","link"];

chrome.contextMenus.create({ "id": "amazon",
							 "title": "Copy ASIN",
							 "documentUrlPatterns":amazonPages,
							 "onclick": amazonASIN,
							 "contexts":context,
							 "targetUrlPatterns": amazonPages });

chrome.contextMenus.create({ "id": "search",
							 "title": "Open Product Page of clicked product",
							 "documentUrlPatterns":searchPages,
							 "onclick": pOnClick,
							 "contexts":context,
							 "targetUrlPatterns": searchPages });

chrome.contextMenus.create({ "id": "product",
							 "title": "Open Specs Page",
							 "documentUrlPatterns":productPages,
							 "onclick": genericOnClick,
							 "contexts":context,
							 "targetUrlPatterns": productPages });

chrome.contextMenus.create({ "id": "specs",
							 "title": "Copy GTIN",
							 "documentUrlPatterns": specsPages,
							 "onclick": googleUPC,
							 "targetUrlPatterns": specsPages });

// chrome.contextMenus.create({ "type": "separator",
//                              "documentUrlPatterns":productPages,
//                              "contexts":context,
//                              "targetUrlPatterns": productPages });

// chrome.contextMenus.create({ "title": "Load in separate Tab",
//                              "id": "loadInSeparateTab",
//                              "type": "checkbox",
//                              "documentUrlPatterns":productPages,
//                              "checked": true,
//                              "onclick": checkboxOnClick,
//                              "contexts":context,
//                              "targetUrlPatterns": productPages
//                            });

var loadInSeparateTab = true;
 
function checkboxOnClick(info, tab) {
	loadInSeparateTab = info.checked
}

function pOnClick(info, tab) {
	var url = '';
	if(info.linkUrl!=undefined){
		url=info.linkUrl;
	}
	else{
		url = tab.url;
	}
 
	url = url.split('#spd=');
	if (url.length >=2) {  
		spdval = url.pop();
		if(spdval != '0'){
			url = 'https://www.google.com/shopping/product/1/online?prds=pid:'+spdval;
			if (loadInSeparateTab) {
				chrome.tabs.create({ url: url, index: tab.index+1 });
			} else {
				chrome.tabs.update(tab.id, { url: url })
			}
		}
	}
}

function genericOnClick(info, tab) {
	var url = '';
	// url = tab.url;
	if(info.linkUrl!==undefined){
		url=info.linkUrl;
	}
	else{
		url = tab.url;
	}

 console.log(url);
 url = url.split('?');

	url[0] = url[0].split("/");
	if (url[0][url[0].length-1] == "online"){
		url[0][url[0].length-1] = "specs"
	}
	else{
		url[0].push("specs");
	}
	url[0] = url[0].join("/")
	url = url.join("?")
 
	if (loadInSeparateTab) {
		chrome.tabs.create({ url: url, index: tab.index+1 });
	} else {
		chrome.tabs.update(tab.id, { url: url })
	}
}

function copyTextToClipboard(text) {
	var el = document.createElement("textarea");// Create new element
	el.value = text;// Set value (string to be copied)

	// Set non-editable to avoid focus and move outside of view
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};

	//Append the textbox field into the body as a child. 
	//"execCommand()" only works when there exists selected text, and the text is inside 
	//document.body (meaning the text is part of a valid rendered HTML element).
	document.body.appendChild(el);

	
	el.select();// Select text inside element
	document.execCommand('copy');//Execute command// Copy text to clipboard
	el.blur();//(Optional) De-select the text using blur(). 

	//Remove the textbox field from the document.body, so no other JavaScript nor 
	//other elements can get access to this.
	document.body.removeChild(el);
}

function amazonASIN(info, tab) {
	var url = '';
 
	try{
		 url = info.linkUrl;
		 url = url.split('?')[0];
	}
	catch(error){
		url = tab.url.split('?')[0];
	}
	console.log(url)
	ASIN = url.slice(url.indexOf("dp")+3);
	
	ASIN = ASIN.split('?')[0];
	ASIN = ASIN.split('/')[0];
	console.log(ASIN)
	copyTextToClipboard(ASIN);
	chrome.tabs.create({ url: 'https://sellercentral.amazon.com/product-search/search?q='+ASIN, index: tab.index+1 });
}

function googleUPC(info, tab){
	// info.menuItemId
	console.log('123');
	query_ = '//*[@id="specs"]/div[last()]/div[last()]/div[last()]/span[last()]/text()';
	query_ ='//text()'
	results = chrome.tabs.executeScript(null, {file: "content.js"});
	// var results = query_ ? evaluateQuery(query_) : ['', 0];
	// console.log(GTIN);

	copyTextToClipboard(results);
}