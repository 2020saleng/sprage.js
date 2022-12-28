(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Sprage"] = factory();
	else
		root["Sprage"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initLoaders": () => (/* binding */ initLoaders)
/* harmony export */ });
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

function initLoaders(vm){
    let loaderObject={}
    _default__WEBPACK_IMPORTED_MODULE_0__.defaultLoaders.forEach((loader,index)=>{
        loader.key=index
        loaderObject[loader.type]=loader
    })
    vm.loaders=loaderObject
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultLoaders": () => (/* binding */ defaultLoaders)
/* harmony export */ });
function defaultCompiler(content){
    return content.toString()
}
const defaultLoaders=[
    {
        type:'number',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return Number(compilered)
        }
    },
    {
        type:'string',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return compilered
        }
    },
    {
        type:'boolean',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return Boolean(compilered)
        }
    },
    {
        type:'undefined',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return undefined
        }
    },
    {
        type:'null',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return null
        }
    },
       {
        type:'symbol',
        compiler:(content)=>{
            return content.toString().slice(7,-1)
        },
        parse:(compilered)=>{
            return Symbol(compilered)
        }
    },
       {
        type:'bigint',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return BigInt(compilered)
        }
    },
       {
        type:'nan',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return NaN
        }
    },
       {
        type:'infinity',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return infinity
        }
    },
    {
        type:'object',
        compiler:(compilered)=>{return compilered},
        parse:(compilered)=>{
            return compilered
        }
    },
    {
        type:'array',
        compiler:(compilered)=>{return compilered},
        parse:(compilered)=>{
            return compilered
        }
    }
]

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initMethods": () => (/* binding */ initMethods)
/* harmony export */ });
/* harmony import */ var _getter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _setter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _remove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _clear__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);




function initMethods(vm){
    const MethodsPool={
        get:_getter__WEBPACK_IMPORTED_MODULE_0__.getter,
        set:_setter__WEBPACK_IMPORTED_MODULE_1__.setter,
        remove:_remove__WEBPACK_IMPORTED_MODULE_2__.remove,
        clear:_clear__WEBPACK_IMPORTED_MODULE_3__.clear
    }
    vm.methods=MethodsPool
    Object.keys(vm.methods).forEach(method=>{
        vm[method]=MethodsPool[method].bind(vm)
    })
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getter": () => (/* binding */ getter)
/* harmony export */ });
function getter(key){
   const value= localStorage.getItem(key)
   return this.compiler.parse(value)
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setter": () => (/* binding */ setter)
/* harmony export */ });
function setter(objectArgs){
   Object.keys(objectArgs).forEach(key=>{
        setItem(key,objectArgs[key],this)
    })
}

function setItem(key,value,vm){
     value=vm.compiler.compiler(value)
    localStorage.setItem(key,value)
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
function remove(options){
    localStorage.removeItem(options)
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear": () => (/* binding */ clear)
/* harmony export */ });
function clear(){
    localStorage.clear()
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Compiler": () => (/* binding */ Compiler)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

class Compiler{
  constructor(options){
    this.loaders=options.loaders
  }
  getInitData(s=null,k=null,c=null,o=null){
    return {
      s,
      k,
      c,
      o
    }
  }
  compiler(value){
      const TYPE=(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getType)(value)
      if(!this.loaders[TYPE]){return}
      if(TYPE=='object'){
          Object.keys(value).forEach(key=>{
            value[key]=this.compiler(value[key])
          })
      }
      if(TYPE=='array'){
        value.forEach((item,index)=>{
            value[index]=this.compiler(item)
        })
      }
      const compilerTypeContent=this.loaders[TYPE].compiler
      const key=this.loaders[TYPE].key
      const InitData=this.getInitData(compilerTypeContent(value),key)
      return this.jsonStringify(InitData)
  }
  parse(string){
      const row=this.jsonParse(string)
      if(!row.s){
          Object.keys(key=>{
            row[key]=this.parse(row[key])
          })
      }
      const key=row.k
      const parseLoader=Object.values(this.loaders).find(loader=>{
        return loader.key==key
      })
      if(!parseLoader){return}
      console.log(row)
      return parseLoader.parse(row.s)
  }
  jsonStringify(object){
    return JSON.stringify(object)
  }
  jsonParse(string){
    if(!typeof string=='string'){
      return string
    }
    return JSON.parse(string)
  }
}



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getType": () => (/* binding */ getType)
/* harmony export */ });
function getType(variable){
        let toString = Object.prototype.toString;
        let dataType = variable instanceof Element ? "element" : toString.call(variable).replace(/\[object\s(.+)\]/, "$1").toLowerCase()
        dataType=dataType=='number'?getSpecialNumberType(variable):dataType
        return dataType
}
function getSpecialNumberType(number){
    if(_isNaN(number)){
        return 'nan'
    }
    if(number.toString()=='Infinity'){
        return 'infinity'
    }
    if(number.toString()=='-Infinity'){
        return '-infinity'
    }
    return 'number'
}

function _isNaN(number){
    return Object.is(number,NaN)
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loaders_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _methods_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _compiler_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);



function Sprage(options){
    this.$options=options
    ;(0,_loaders_init__WEBPACK_IMPORTED_MODULE_0__.initLoaders)(this)
    this.compiler=new _compiler_index__WEBPACK_IMPORTED_MODULE_2__.Compiler(this)
    ;(0,_methods_init__WEBPACK_IMPORTED_MODULE_1__.initMethods)(this)
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprage);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});