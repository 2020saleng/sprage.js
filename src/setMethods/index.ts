// 初始化set方法
const utils = require("../utils");
import { initSetCount } from "./initSetCount";
import { initSetTime } from "./initSetTime";
interface KeyValueObject {
  [key: string]: any;
}
export function initSetMethods(vm: any) {
  initSetCount(vm);
  initSetTime(vm);
  vm.set = function (
    param: string | KeyValueObject,
    val?: string | KeyValueObject
  ): boolean {
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
    function setItem(key: string, val: any): void {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch {
        let size =
          <number>self.size(true) + key.length + JSON.stringify(val).length;
        if (self.isFull(size) && self.autoClear) {
          while (true) {
            let index = 0;
            for (; index < self.getAll().length; index++) {
              if (
                self.exclude.indexOf(Object.keys(self.getAll()[index])[0]) != -1
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
