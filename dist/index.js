module.exports=function(e){var n={};function t(r){if(n[r])return n[r].exports;var u=n[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,t),u.l=!0,u.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var u in e)t.d(r,u,function(n){return e[n]}.bind(null,u));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);var r={};t.r(r),t.d(r,"pageIndex",(function(){return i})),t.d(r,"pageCount",(function(){return o})),t.d(r,"pageFirst",(function(){return c})),t.d(r,"pageLast",(function(){return f})),t.d(r,"pages",(function(){return l})),t.d(r,"pagesI",(function(){return s})),t.d(r,"pageCurr",(function(){return a})),t.d(r,"pagePrev",(function(){return d})),t.d(r,"pageNext",(function(){return p})),t.d(r,"pageSeek",(function(){return g})),t.d(r,"pageCurrM",(function(){return m})),t.d(r,"pagePrevM",(function(){return k})),t.d(r,"pageNextM",(function(){return b})),t.d(r,"pageSeekM",(function(){return O}));var u={};function i(e,n){return Math.floor(e/n)}function o(e,n){return Math.ceil(e/n)}function c(e){return 0===e}function f(e,n){return e===n-1}function l(e){return Array.from({length:e},(e,n)=>n+1)}function*s(e){for(let n=1;n<=e;++n)yield n}function a(e,n){const t=null!=n?n:e.limit;return{seek:i(e.seek,t)*t,limit:t}}function d(e,n){const t=null!=n?n:e.limit;let r=i(e.seek,t);return{seek:(r=Math.max(r-1,0))*t,limit:t}}function p(e,n){const t=null!=n?n:e.limit;let r=i(e.seek,t);return{seek:(r+=1)*t,limit:t}}function g(e,n,t){const r=null!=t?t:e.limit;let u=i(n,r);return{seek:(u=Math.max(u,0))*r,limit:r}}function m(e,n,t){return j(n,a(e,t))}function k(e,n,t){return j(n,a(e,t))}function b(e,n,t){return j(n,a(e,t))}function O(e,n,t,r){return j(n,a(e,r))}function j(e,n){const t=e(n.seek,n.limit);return t instanceof Promise?t.then(e=>Object.assign(Object.assign({},n),e)):Object.assign(Object.assign({},n),t)}function M(e,n){if(!0===e.order){const t=null!=n?n:e.limit;return{order:!0,seek:e.seek,limit:t}}if(!1===e.order){const t=null!=n?n:e.limit;return{order:!1,seek:e.seek,limit:t}}return{order:null,seekAfter:e.seekAfter,seekBefore:e.seekBefore}}function v(e,n){let t;return t=null===e.order?null!=n?n:e.count:null!=n?n:e.limit,{order:!1,seek:e.seekFirst,limit:t}}function y(e,n){let t;return t=null===e.order?null!=n?n:e.count:null!=n?n:e.limit,{order:!0,seek:e.seekLast,limit:t}}function x(e,n,t){return S(n,M(e,t))}function P(e,n,t){return S(n,v(e,t))}function h(e,n,t){return S(n,y(e,t))}function S(e,n){let t;return(t=null===n.order?e(n.order,n.seekAfter,n.seekBefore):e(n.order,n.seek,n.limit))instanceof Promise?t.then(e=>Object.assign(Object.assign({},n),e)):Object.assign(Object.assign({},n),t)}t.r(u),t.d(u,"pageCurr",(function(){return M})),t.d(u,"pagePrev",(function(){return v})),t.d(u,"pageNext",(function(){return y})),t.d(u,"pageCurrM",(function(){return x})),t.d(u,"pagePrevM",(function(){return P})),t.d(u,"pageNextM",(function(){return h})),t.d(n,"paginationOffset",(function(){return r})),t.d(n,"paginationCursor",(function(){return u}))}]);
//# sourceMappingURL=index.js.map