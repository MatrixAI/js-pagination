!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e=t();for(var r in e)("object"==typeof exports?exports:n)[r]=e[r]}}(window,(function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return n[r].call(u.exports,u,u.exports,e),u.l=!0,u.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var u in n)e.d(r,u,function(t){return n[t]}.bind(null,u));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){"use strict";function r(n,t){return Math.floor(n/t)}function u(n,t){return Math.ceil(n/t)}function i(n){return 0===n}function o(n,t){return n===t-1}function c(n){return Array.from({length:n},(n,t)=>t+1)}function*f(n){for(let t=1;t<=n;++t)yield t}function l(n,t){const e=null!=t?t:n.limit;return{seek:r(n.seek,e)*e,limit:e}}function a(n,t,e){return _(t,l(n,e))}function s(n,t){const e=null!=t?t:n.limit;return{seek:n.seek,limit:e}}function p(n,t,e){return _(t,s(n,e))}function d(n,t){const e=null!=t?t:n.limit;let u=r(n.seek,e);return{seek:(u=Math.max(u-1,0))*e,limit:e}}function m(n,t,e){return _(t,d(n,e))}function g(n,t){const e=null!=t?t:n.limit;return{seek:n.seek-e,limit:e}}function k(n,t,e){return _(t,g(n,e))}function b(n,t){const e=null!=t?t:n.limit;let u=r(n.seek,e);return{seek:(u+=1)*e,limit:e}}function M(n,t,e){return _(t,b(n,e))}function x(n,t){const e=null!=t?t:n.limit;return{seek:n.seek+e,limit:e}}function y(n,t,e){return _(t,x(n,e))}function j(n,t,e){const u=null!=e?e:n.limit;let i=r(t,u);return{seek:(i=Math.max(i,0))*u,limit:u}}function v(n,t,e,r){return _(t,j(n,e,r))}function w(n,t,e){return{seek:t,limit:null!=e?e:n.limit}}function O(n,t,e,r){return _(t,w(n,e,r))}function P(n,t,e){const r=null!=e?e:n.limit;return{seek:Math.max(t,0)*r,limit:r}}function R(n,t,e,r){return _(t,P(n,e,r))}function h(n,t,e){const r=null!=e?e:n.limit;return{seek:Math.max(t,0)*n.limit,limit:r}}function S(n,t,e,r){return _(t,h(n,e,r))}function _(n,t){const e=n(t.seek,t.limit);return e instanceof Promise?e.then(n=>Object.assign(Object.assign({},t),{total:n.total,count:n.count,items:n.items})):Object.assign(Object.assign({},t),{total:e.total,count:e.count,items:e.items})}e.r(t),e.d(t,"pageIndex",(function(){return r})),e.d(t,"pageCount",(function(){return u})),e.d(t,"pageFirst",(function(){return i})),e.d(t,"pageLast",(function(){return o})),e.d(t,"pages",(function(){return c})),e.d(t,"pagesI",(function(){return f})),e.d(t,"pageCurr",(function(){return l})),e.d(t,"pageCurrM",(function(){return a})),e.d(t,"pageCurrRaw",(function(){return s})),e.d(t,"pageCurrRawM",(function(){return p})),e.d(t,"pagePrev",(function(){return d})),e.d(t,"pagePrevM",(function(){return m})),e.d(t,"pagePrevRaw",(function(){return g})),e.d(t,"pagePrevRawM",(function(){return k})),e.d(t,"pageNext",(function(){return b})),e.d(t,"pageNextM",(function(){return M})),e.d(t,"pageNextRaw",(function(){return x})),e.d(t,"pageNextRawM",(function(){return y})),e.d(t,"pageSeek",(function(){return j})),e.d(t,"pageSeekM",(function(){return v})),e.d(t,"pageSeekRaw",(function(){return w})),e.d(t,"pageSeekRawM",(function(){return O})),e.d(t,"pageJump",(function(){return P})),e.d(t,"pageJumpM",(function(){return R})),e.d(t,"pageJumpRaw",(function(){return h})),e.d(t,"pageJumpRawM",(function(){return S}))}])}));
//# sourceMappingURL=Offset.js.map