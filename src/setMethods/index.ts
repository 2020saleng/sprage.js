// 初始化set方法
const utils = require("../utils");
import { initSetCount } from "./initSetCount";
import { initSetTime } from "./initSetTime";
interface KeyValueObject {
  [key: string]: any;
}
export function initSetMethods(vm: any) {
  // 先初始化其他set方法
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
    // 对原生settime方法进行封装
    function setItem(key: string, val: any): void {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch {
        let size =
          <number>self.size(true) + key.length + JSON.stringify(val).length;
        // 如果内存满则不断清除前面的内存来存储
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
