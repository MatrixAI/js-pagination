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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
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
        return result.then((result_) => (Object.assign(Object.assign({}, patch), { count: result_.count, seekFirst: result_.seekFirst, seekLast: result_.seekLast, items: result_.items })));
    }
    else {
        return Object.assign(Object.assign({}, patch), { count: result.count, seekFirst: result.seekFirst, seekLast: result.seekLast, items: result.items });
    }
}



/***/ })
/******/ ]);
//# sourceMappingURL=Cursor.js.map