var url = window.location.href
console.log('Content.jsnew');
setTimeout(function(){
  if ((url.indexOf('https://www.google.com/shopping') !== -1) && (url.indexOf('/specs') !== -1)) {
    if (url.indexOf('?' !== -1)) {
      url = url.split("?")[0]
    }
    // var post = (document.getElementsByClassName('graf')[0].innerHTML).replace(/&nbsp;/g, ' ') + ' \n\n' + url
    var post = document.querySelectorAll('tr:last-of-type td:last-of-type')
    
    console.log(post.length)
    post = post[post.length-1].innerHTML
    navigator.clipboard.writeText(post).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}, 2000);



// /*
//  * Name: Copy DOM Content
//  * Version: 1.0
//  * Author: QoSMicro.com
//  * Copyright (c) 2016 QoSMicro.com
//  * Licensed under http://opensource.org/licenses/MIT
//  */

// // Listen for messages
// chrome.runtime.onMessage.addListener( function( msg, sender, callback ) {
//  	"use strict";

//    // If the received message has the expected format...
//     if( msg.text === 'report_back' ) {
//       console.log('Content.js');
// 		query_ = '//*[@id="specs"]/div[last()]/div[last()]/div[last()]/span[last()]/text()';
//         var resultDOM = evaluateQuery(query_, document );
//         callback( resultDOM );
//     }

// });

// var evaluateQuery = function(query, DOM) {
//   var xpathResult = null;
//   var str = '';
//   var nodeCount = 0;
//   var toHighlight = [];

//   try {
//     xpathResult = DOM.evaluate(query, DOM, null,
//                                     XPathResult.ANY_TYPE, null);
//   } catch (e) {
//     str = '[INVALID XPATH EXPRESSION]';
//     nodeCount = 0;
//   }

//   if (!xpathResult) {
//     return [str, nodeCount];
//   }

//   if (xpathResult.resultType === XPathResult.BOOLEAN_TYPE) {
//     str = xpathResult.booleanValue ? '1' : '0';
//     nodeCount = 1;
//   } else if (xpathResult.resultType === XPathResult.NUMBER_TYPE) {
//     str = xpathResult.numberValue.toString();
//     nodeCount = 1;
//   } else if (xpathResult.resultType === XPathResult.STRING_TYPE) {
//     str = xpathResult.stringValue;
//     nodeCount = 1;
//   } else if (xpathResult.resultType ===
//              XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
//     for (var node = xpathResult.iterateNext(); node;
//          node = xpathResult.iterateNext()) {
//       if (node.nodeType === Node.ELEMENT_NODE) {
//         toHighlight.push(node);
//       }
//       if (str) {
//         str += '\n';
//       }
//       str += node.textContent;
//       nodeCount++;
//     }
//     if (nodeCount === 0) {
//       str = '[NULL]';
//     }
//   } else {
//     // Since we pass XPathResult.ANY_TYPE to document.evaluate(), we should
//     // never get back a result type not handled above.
//     str = '[INTERNAL ERROR]';
//     nodeCount = 0;
//   }

//   // xh.highlight(toHighlight);
//   return [str, nodeCount];
// };