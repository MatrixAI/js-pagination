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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCurr", function() { return pageCurr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrev", function() { return pagePrev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNext", function() { return pageNext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCurrM", function() { return pageCurrM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrevM", function() { return pagePrevM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNextM", function() { return pageNextM; });
/**
 * Cursor pagination
 *
 * @remarks
 *
 * Cursor pagination relies on unique orderable seek key.
 *
 * Consider the resource we are paginating is:
 *
 * ```ts
 * ['A', 'B', 'C', 'D']
 * ```
 *
 * Assume that the seek key is `[0, 1, 2, 3]`.
 * Using `order = true`, `seek = 0` and `limit = 2`, you would get `['B', 'C']`.
 * Using `order = false`, `seek = 2` and `limit = 2`, you would get `['A', 'B']`.
 * Using `order = null`, `seekAfter = 1`, `seekBefore = 3`, you would get `['C']`.
 *
 * Cursor pagination does not allow random access of the pages.
 * You can however randomly access if you know the seek key you want.
 */
function pageCurr(page, limit) {
    if (page.order === true) {
        const limitNew = (limit != null) ? limit : page.limit;
        return {
            order: true,
            seek: page.seek,
            limit: limitNew
        };
    }
    else if (page.order === false) {
        const limitNew = (limit != null) ? limit : page.limit;
        return {
            order: false,
            seek: page.seek,
            limit: limitNew
        };
    }
    else {
        return {
            order: null,
            seekAfter: page.seekAfter,
            seekBefore: page.seekBefore
        };
    }
}
function pagePrev(page, limit) {
    let limitNew;
    if (page.order === null) {
        limitNew = (limit != null) ? limit : page.count;
    }
    else {
        limitNew = (limit != null) ? limit : page.limit;
    }
    return {
        order: false,
        seek: page.seekFirst,
        limit: limitNew
    };
}
function pageNext(page, limit) {
    let limitNew;
    if (page.order === null) {
        limitNew = (limit != null) ? limit : page.count;
    }
    else {
        limitNew = (limit != null) ? limit : page.limit;
    }
    return {
        order: true,
        seek: page.seekLast,
        limit: limitNew
    };
}
function pageCurrM(page, action, limit) {
    const patch = pageCurr(page, limit);
    return processAction(action, patch);
}
function pagePrevM(page, action, limit) {
    const patch = pagePrev(page, limit);
    return processAction(action, patch);
}
function pageNextM(page, action, limit) {
    const patch = pageNext(page, limit);
    return processAction(action, patch);
}
function processAction(action, patch) {
    let result;
    if (patch.order === null) {
        result = action(patch.order, patch.seekAfter, patch.seekBefore);
    }
    else {
        result = action(patch.order, patch.seek, patch.limit);
    }
    if (result instanceof Promise) {
        return result.then((result_) => (Object.assign(Object.assign({}, patch), result_)));
    }
    else {
        return Object.assign(Object.assign({}, patch), result);
    }
}



/***/ }),
/* 1 */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrev", function() { return pagePrev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNext", function() { return pageNext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageSeek", function() { return pageSeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageCurrM", function() { return pageCurrM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagePrevM", function() { return pagePrevM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNextM", function() { return pageNextM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageSeekM", function() { return pageSeekM; });
/**
 * Offset pagination
 *
 * @remarks
 *
 * Offset pagination relies on a seek and limit number.
 *
 * Consider the resource we are paginating is:
 *
 * ```ts
 * ['A', 'B', 'C', 'D']
 * ```
 *
 * The seek index starts at 0.
 * The limit is entire length of the returned pagination view.
 * A seek and limit of `[0, 2]` would return `['A', 'B']`.
 *
 * The page numbers start at 1. So by using `[0, 2]`
 * we get page numbers of `[1, 2]`. We still refer to these numbers
 * with the page index.
 *
 * Note that the total represents the total number of items
 * when the pagination was fetched. The true total of items may have
 * changed on the server side since fetching a pagination.
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
function pages(pageCount) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
}
function* pagesI(pageCount) {
    for (let i = 1; i <= pageCount; ++i) {
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
function pagePrev(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = pageIndex(page.seek, limitNew);
    indexNew = Math.max(indexNew - 1, 0);
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pageNext(page, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = pageIndex(page.seek, limitNew);
    indexNew = indexNew + 1;
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pageSeek(page, seek, limit) {
    const limitNew = (limit != null) ? limit : page.limit;
    let indexNew = pageIndex(seek, limitNew);
    indexNew = Math.max(indexNew, 0);
    const seekNew = indexNew * limitNew;
    return { seek: seekNew, limit: limitNew };
}
function pageCurrM(page, action, limit) {
    const patch = pageCurr(page, limit);
    return processAction(action, patch);
}
function pagePrevM(page, action, limit) {
    const patch = pageCurr(page, limit);
    return processAction(action, patch);
}
function pageNextM(page, action, limit) {
    const patch = pageCurr(page, limit);
    return processAction(action, patch);
}
function pageSeekM(page, action, seek, limit) {
    const patch = pageCurr(page, limit);
    return processAction(action, patch);
}
function processAction(action, patch) {
    const result = action(patch.seek, patch.limit);
    if (result instanceof Promise) {
        return result.then((result_) => {
            return Object.assign(Object.assign({}, patch), result_);
        });
    }
    else {
        return Object.assign(Object.assign({}, patch), result);
    }
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _offset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return _offset__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return _cursor__WEBPACK_IMPORTED_MODULE_1__; });





/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map