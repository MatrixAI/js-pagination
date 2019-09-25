module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageIndex", function() { return pageIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCount", function() { return pageCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageFirst", function() { return pageFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageLast", function() { return pageLast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pages", function() { return pages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagesI", function() { return pagesI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCurr", function() { return pageCurr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCurrA", function() { return pageCurrA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCurrRaw", function() { return pageCurrRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCurrRawA", function() { return pageCurrRawA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrev", function() { return pagePrev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrevA", function() { return pagePrevA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrevRaw", function() { return pagePrevRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrevRawA", function() { return pagePrevRawA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNext", function() { return pageNext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNextA", function() { return pageNextA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNextRaw", function() { return pageNextRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNextRawA", function() { return pageNextRawA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageSeek", function() { return pageSeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageSeekA", function() { return pageSeekA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageSeekRaw", function() { return pageSeekRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageSeekRawA", function() { return pageSeekRawA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageJump", function() { return pageJump; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageJumpA", function() { return pageJumpA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageJumpRaw", function() { return pageJumpRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageJumpRawA", function() { return pageJumpRawA; });
/**
 * Offset pagination
 */
function pageIndex(seek, limit) {
    return Math.floor(seek / limit);
}
function pageCount(total, limit) {
    return Math.ceil(total / limit);
}
function pageFirst(index) {
    return index === 0;
}
function pageLast(index, count) {
    return index === (count - 1);
}
function pages(count) {
    return Array.from({ length: count }, (_, i) => i + 1);
}
function* pagesI(count) {
    for (let i = 1; i <= count; ++i) {
        yield i;
    }
}
function pageCurr(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    const indexNew = pageIndex(page.seek, limitNew);
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
;
function pageCurrA(page, action, limit) {
    const patch = pageCurr(page, limit);
    return processAction(action, patch);
}
function pageCurrRaw(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    const seekNew = page.seek;
    return { seek: seekNew, limit: limitNew };
}
;
function pageCurrRawA(page, action, limit) {
    const patch = pageCurrRaw(page, limit);
    return processAction(action, patch);
}
function pagePrev(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = pageIndex(page.seek, limitNew);
    indexNew = Math.max(indexNew - 1, 0);
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pagePrevA(page, action, limit) {
    const patch = pagePrev(page, limit);
    return processAction(action, patch);
}
function pagePrevRaw(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    const seekNew = page.seek - limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pagePrevRawA(page, action, limit) {
    const patch = pagePrevRaw(page, limit);
    return processAction(action, patch);
}
function pageNext(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = pageIndex(page.seek, limitNew);
    indexNew = indexNew + 1;
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pageNextA(page, action, limit) {
    const patch = pageNext(page, limit);
    return processAction(action, patch);
}
function pageNextRaw(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    const seekNew = page.seek + limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pageNextRawA(page, action, limit) {
    const patch = pageNextRaw(page, limit);
    return processAction(action, patch);
}
function pageSeek(page, seek, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = pageIndex(seek, limitNew);
    indexNew = Math.max(indexNew, 0);
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pageSeekA(page, action, seek, limit) {
    const patch = pageSeek(page, seek, limit);
    return processAction(action, patch);
}
function pageSeekRaw(page, seek, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    return { seek: seek, limit: limitNew };
}
function pageSeekRawA(page, action, seek, limit) {
    const patch = pageSeekRaw(page, seek, limit);
    return processAction(action, patch);
}
function pageJump(page, index, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = Math.max(index, 0);
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pageJumpA(page, action, index, limit) {
    const patch = pageJump(page, index, limit);
    return processAction(action, patch);
}
function pageJumpRaw(page, index, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = Math.max(index, 0);
    const seekNew = indexNew * page.limit;
    return { seek: seekNew, limit: limitNew };
}
function pageJumpRawA(page, action, index, limit) {
    const patch = pageJumpRaw(page, index, limit);
    return processAction(action, patch);
}
function processAction(action, patch) {
    const result = action(patch.seek, patch.limit);
    if (result instanceof Promise) {
        return result.then((result_) => {
            return Object.assign(Object.assign({}, patch), { total: result_.total, length: result_.length, items: result_.items });
        });
    }
    else {
        return Object.assign(Object.assign({}, patch), { total: result.total, length: result.length, items: result.items });
    }
}



/***/ })
/******/ ]);
//# sourceMappingURL=Offset.js.map