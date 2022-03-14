(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["Sprage"] = factory();
  else root["Sprage"] = factory();
})(this, function () {
  return /******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/ var __webpack_modules__ = [
      /* 0 */
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        module.exports = __webpack_require__(1);

        /***/
      },
      /* 1 */
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        const date = __webpack_require__(2);
        const utils = __webpack_require__(3);
        class Sprage {
          constructor(option = { autoClear: true, exclude: [] }) {
            this.autoClear = option.autoClear;
            this.exclude = option.exclude ? option.exclude : [];
          }
          get(param) {
            let str = this.getFirst(param);
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
          }
          // 获取并用JSON解析localStorage某个键的函数
          getFirst(key) {
            let str = localStorage.getItem(key);
            return str == null ? null : JSON.parse(str);
          }
          set(param, val) {
            const self = this;
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
          }
          // 判断某个键值是否存在
          has(key) {
            return !utils.isNull(localStorage.getItem(key));
          }
          // 删除某个键值，支持使用数组批量删除
          remove(param) {
            try {
              if (typeof param == "string") {
                this.removeItem(param);
              } else {
                param.forEach((element) => {
                  this.removeItem(element);
                });
              }
              return true;
            } catch (_a) {
              return false;
            }
          }
          // 调用API删除某个键的函数
          removeItem(param) {
            this.has(param) ? localStorage.removeItem(param) : null;
          }
          // 清除所有函数
          clear() {
            localStorage.clear();
          }
          // 设置使用次数的函数,要求使用对象语法
          setCount(params, count) {
            for (let item in params) {
              params.hasOwnProperty(item)
                ? this.remove(item) &&
                  localStorage.setItem(
                    item,
                    JSON.stringify({
                      _Val: params[item],
                      _count_: count,
                    })
                  )
                : null;
            }
          }
          // 让一个设置仅能够调用一次
          setOnce(params) {
            this.setCount(params, 1);
          }
          // 设置过期时间的方法,会使用一个叫time的,可自定义的插件
          setTime(params, expiration) {
            expiration = Sprage.plugins.time(expiration);
            if (typeof expiration == "string") {
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
          }
          // 获取所有localStorage对象
          getAll() {
            let List = [];
            for (let index = 0; index < localStorage.length; index++) {
              let temp = localStorage.key(index);
              let val = JSON.parse(localStorage.getItem(temp));
              if (typeof val != "object") {
                List.push({ [temp]: val });
              } else if ("_Val" in val) {
                List.push({ [temp]: val._Val });
              } else {
                List.push({ [temp]: val });
              }
            }
            return List;
          }
          // 使用foreach遍历每个对象
          forEach(fn) {
            let List = this.getAll();
            List.forEach((e) => {
              for (let key in e) {
                let value = e[key];
                fn(key, value);
              }
            });
          }
          isFull(param) {
            if (param) {
              return !(Number(this.size(true)) + Number(param) < 5 * 1024);
            }
            return !(this.surplus(true) > 0);
          }
          size(isNumber = false) {
            let size =
              Object.entries(localStorage)
                .map((val) => val.join(""))
                .join("").length / 1024;
            return isNumber ? size.toFixed(2) : size.toFixed(2) + "KB";
          }
          surplus(isNumber = false) {
            let sum = 5 * 1024;
            let cache = this.size(true);
            return isNumber
              ? (sum - cache).toFixed(2)
              : (sum - cache).toFixed(2) + "KB";
          }
          // 使用插件
          static install(name, descriptor) {
            Sprage.plugins[name] = descriptor;
          }
        }
        Sprage.plugins = {};
        Sprage.install("time", new date().timeInvertFn);
        module.exports = Sprage;

        /***/
      },
      /* 2 */
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
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module used 'module' so it can't be inlined
    /******/ var __webpack_exports__ = __webpack_require__(0);
    /******/
    /******/ return __webpack_exports__;
    /******/
  })();
});
