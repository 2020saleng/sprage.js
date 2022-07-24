(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["Sprage"] = factory();
  else root["Sprage"] = factory();
})(this, () => {
  return /******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/ var __webpack_modules__ = [
      ,
      /* 0 */ /* 1 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initMethods: () => /* binding */ initMethods,
          /* harmony export */
        });
        /* harmony import */ var _baseMethods_initGet__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(2);
        /* harmony import */ var _baseMethods_initRemove__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(4);
        /* harmony import */ var _baseMethods_initHas__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(5);
        /* harmony import */ var _setMethods_index__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(6);
        /* harmony import */ var _baseMethods_initClear__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(9);
        /* harmony import */ var _utilsMethods_index__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(10);

        function initMethods(vm) {
          (0,
          _utilsMethods_index__WEBPACK_IMPORTED_MODULE_5__.initUtilsMethods)(
            vm
          );
          (0, _setMethods_index__WEBPACK_IMPORTED_MODULE_3__.initSetMethods)(
            vm
          );
          (0, _baseMethods_initHas__WEBPACK_IMPORTED_MODULE_2__.initHas)(vm);
          (0, _baseMethods_initRemove__WEBPACK_IMPORTED_MODULE_1__.initRemove)(
            vm
          );
          (0, _baseMethods_initGet__WEBPACK_IMPORTED_MODULE_0__.initGet)(vm);
          (0, _baseMethods_initClear__WEBPACK_IMPORTED_MODULE_4__.initClear)(
            vm
          );
        }

        /***/
      },
      /* 2 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initGet: () => /* binding */ initGet,
          /* harmony export */
        });
        const utils = __webpack_require__(3);
        function initGet(vm) {
          vm.get = function (param) {
            let str = getStorageInit(param);
            if (typeof str == "string") {
              return str;
            } else if (str && str._token_) {
              if (utils.checkTime(str._token_)) {
                return str._Val;
              }
              this.remove(param);
              return null;
            } else if (str && str._count_ != undefined) {
              if (str._count_ > 0) {
                let count = str._count_ - 1;
                this.setCount({ [param]: str._Val }, count);
                return str._Val;
              }
              this.remove(param);
              return null;
            }
            return str;
          };
          vm.getAll = function () {
            let List = [];
            for (let index = 0; index < localStorage.length; index++) {
              let temp = localStorage.key(index);
              let val = JSON.parse(localStorage.getItem(temp));
              console.log(val);
              if (typeof val != "object") {
                try {
                  val = JSON.parse(val);
                } catch (_a) {}
                List.push({ [temp]: val });
              } else if ("_Val" in val) {
                List.push({ [temp]: val._Val });
              } else {
                List.push({ [temp]: val });
              }
            }
            return List;
          };
        }
        function getStorageInit(key) {
          let str = localStorage.getItem(key);
          if (str === null) {
            return null;
          }
          str = JSON.parse(str);
          if (str != null) {
            try {
              str = JSON.parse(str);
            } catch (_a) {}
          }
          return str;
        }

        /***/
      },
      /* 3 */
      /***/ (module) => {
        module.exports = {
          /**
           *  检验一个参数是否为null
           * @param {any} val - 检验参数.
           */
          isNull: function (val) {
            return !val && typeof val != undefined && val != 0;
          },
          /**
           *  检验一个参数是否为NAN
           * @param {any} val - 检验参数.
           */
          isNAN: function (val) {
            return Object.is(val, NaN);
          },
          /**
           *  检验当前时间是否超过了设置的时间
           * @param {number|string} param - 检验参数,需要是数字或字符类型的时间戳.
           */
          checkTime: function (param) {
            return Number(param) > new Date().getTime();
          },
          /**
           *  格式化标准时间
           * @param {string} param- 对可以被Date对象转化为时间戳的参数进行转化
           */
          formatTimeInvert: function (param) {
            return new Date(param).getTime();
          },
        };

        /***/
      },
      /* 4 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initRemove: () => /* binding */ initRemove,
          /* harmony export */
        });
        function initRemove(vm) {
          vm.remove = function (param) {
            try {
              if (typeof param == "string") {
                removeItem(vm, param);
              } else {
                param.forEach((element) => {
                  removeItem(vm, element);
                });
              }
              return true;
            } catch (e) {
              return false;
            }
          };
        }
        function removeItem(vm, param) {
          console.log(param);
          vm.has(param) ? localStorage.removeItem(param) : null;
        }

        /***/
      },
      /* 5 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initHas: () => /* binding */ initHas,
          /* harmony export */
        });
        const utils = __webpack_require__(3);
        function initHas(vm) {
          vm.has = function (key) {
            return !utils.isNull(localStorage.getItem(key));
          };
        }

        /***/
      },
      /* 6 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initSetMethods: () =>
            /* binding */ initSetMethods,
          /* harmony export */
        });
        /* harmony import */ var _initSetCount__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(7);
        /* harmony import */ var _initSetTime__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(8);
        const utils = __webpack_require__(3);

        function initSetMethods(vm) {
          (0, _initSetCount__WEBPACK_IMPORTED_MODULE_0__.initSetCount)(vm);
          (0, _initSetTime__WEBPACK_IMPORTED_MODULE_1__.initSetTime)(vm);
          vm.set = function (param, val) {
            const self = vm;
            if (typeof param == "string" && val) {
              if (utils.isNull(val)) {
                throw "The value cannot be empty";
              }
              setItem(param, JSON.stringify(val));
            } else if (typeof param == "object") {
              for (let item in param) {
                param.hasOwnProperty(item)
                  ? setItem(item, JSON.stringify(param[item]))
                  : null;
              }
            } else {
              return false;
            }
            return true;
            function setItem(key, val) {
              try {
                localStorage.setItem(key, JSON.stringify(val));
              } catch (_a) {
                let size =
                  self.size(true) + key.length + JSON.stringify(val).length;
                if (self.isFull(size) && self.autoClear) {
                  while (true) {
                    let index = 0;
                    for (; index < self.getAll().length; index++) {
                      if (
                        self.exclude.indexOf(
                          Object.keys(self.getAll()[index])[0]
                        ) != -1
                      )
                        continue;
                      break;
                    }
                    if (index == self.getAll().length) {
                      throw "The legal space is full ";
                    }
                    let removeValue = Object.keys(self.getAll()[index])[0];
                    localStorage.removeItem(removeValue);
                    if (!self.isFull(size)) {
                      setItem(key, val);
                      break;
                    }
                  }
                } else {
                  console.error("error in setItem");
                }
              }
            }
          };
        }

        /***/
      },
      /* 7 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initSetCount: () => /* binding */ initSetCount,
          /* harmony export */
        });
        function initSetCount(vm) {
          vm.setCount = function (params, count) {
            for (let item in params) {
              params.hasOwnProperty(item)
                ? vm.remove(item) &&
                  localStorage.setItem(
                    item,
                    JSON.stringify({
                      _Val: params[item],
                      _count_: count,
                    })
                  )
                : null;
            }
          };
          vm.setOnce = function (params) {
            this.setCount(params, 1);
          };
        }

        /***/
      },
      /* 8 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initSetTime: () => /* binding */ initSetTime,
          /* harmony export */
        });
        function initSetTime(vm) {
          vm.setTime = function (params, expiration) {
            let { constructor } = this;
            expiration = constructor.plugins.time(expiration);
            let typeList = ["number", "string"];
            if (
              typeList.every((item) => {
                return typeof item == item;
              })
            ) {
              return;
            }
            for (let item in params) {
              params.hasOwnProperty(item)
                ? localStorage.setItem(
                    item,
                    JSON.stringify({
                      _Val: params[item],
                      _token_: expiration,
                    })
                  )
                : null;
            }
          };
        }

        /***/
      },
      /* 9 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initClear: () => /* binding */ initClear,
          /* harmony export */
        });
        function initClear(vm) {
          vm.clear = function () {
            localStorage.clear();
          };
        }

        /***/
      },
      /* 10 */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ initUtilsMethods: () =>
            /* binding */ initUtilsMethods,
          /* harmony export */
        });
        function initUtilsMethods(vm) {
          vm.size = function (isNumber = false) {
            let size =
              Object.entries(localStorage)
                .map((val) => val.join(""))
                .join("").length / 1024;
            return isNumber ? size.toFixed(2) : size.toFixed(2) + "KB";
          };
          vm.surplus = function (isNumber = false) {
            let sum = 5 * 1024;
            let cache = vm.size(true);
            return isNumber
              ? (sum - cache).toFixed(2)
              : (sum - cache).toFixed(2) + "KB";
          };
          vm.isFull = function (param) {
            if (param) {
              return !(Number(vm.size(true)) + Number(param) < 5 * 1024);
            }
            return !(vm.surplus(true) > 0);
          };
        }

        /***/
      },
      /* 11 */
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        class TimeInver {
          constructor() {
            this.unitList = ["s", "min", "h", "day"];
            this.timeList = [1000, 60000, 3600000, 86400000];
          }
          formatTimeInvert(param) {
            const utils = __webpack_require__(3);
            return utils.formatTimeInvert.call(this, param);
          }
          getIndex(param) {
            for (let i = 0; i < this.unitList.length; i++) {
              if (param.indexOf(this.unitList[i]) != -1) {
                return i;
              }
            }
            return undefined;
          }
          afterTime(param, index) {
            const now = new Date().getTime();
            let time = Number(
              param.slice(0, param.length - this.unitList[index].length)
            );
            if (isNaN(time)) {
              throw "time should be a number";
            }
            return now + time * this.timeList[index];
          }
          afterTimeInvert(param) {
            param = param.trim();
            let index = this.getIndex(param);
            if (index === undefined) {
              throw "unit is wrongfulness";
            }
            return this.afterTime(param, index);
          }
          timeInvert(params) {
            return params.includes("-")
              ? this.formatTimeInvert(params)
              : this.afterTimeInvert(params);
          }
          timeInvertFn(params) {
            let time = new TimeInver();
            return time.timeInvert.call(time, params);
          }
        }
        module.exports = TimeInver;

        /***/
      },
      /******/
    ];
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ var cachedModule = __webpack_module_cache__[moduleId];
      /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/ exports: {},
        /******/
      });
      /******/
      /******/ // Execute the module function
      /******/ __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__
      );
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            });
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop);
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module",
          });
          /******/
        }
        /******/ Object.defineProperty(exports, "__esModule", { value: true });
        /******/
      };
      /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(1);

      const date = __webpack_require__(11);
      class Sprage {
        constructor(option = { autoClear: true, exclude: [] }) {
          this.autoClear = option.autoClear;
          this.exclude = option.exclude ? option.exclude : [];
          const vm = this;
          this.init(vm);
        }
        init(vm) {
          (0, _init__WEBPACK_IMPORTED_MODULE_0__.initMethods)(vm);
        }
        static install(name, descriptor) {
          this.plugins[name] = descriptor;
        }
      }
      Sprage.plugins = {};
      // initPlugins(Sprage)
      Sprage.install("time", new date().timeInvertFn);
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Sprage;
    })();

    __webpack_exports__ = __webpack_exports__["default"];
    /******/ return __webpack_exports__;
    /******/
  })();
});
