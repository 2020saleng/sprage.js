const utils = require("../utils.ts");
interface KeyValueObject {
  [key: string]: any;
}
// 涉及到私有对象的接口
interface tokenObject {
  _Val: string | object;
  _token_: number;
  _count_: number;
}
// 初始化get方法
export function initGet(vm: any): void {
  vm.get = function (param: string) {
    // 被还原过的值
    let str: string | tokenObject | KeyValueObject = getStorageInit(param);
    if (typeof str == "string") {
      return str;
      // 当存在时间戳时检查时间
    } else if (str && str._token_) {
      if (utils.checkTime(str._token_)) {
        return str._Val;
      }
      this.remove(param);
      return null;
      // 检测有没有设置存在次数
    } else if (str && str._count_ != undefined) {
      // 存在且这个值大于0，则将这个值减一
      if (str._count_ > 0) {
        let count: number = str._count_ - 1;
        this.setCount({ [param]: str._Val }, count);
        return str._Val;
      }
      this.remove(param);
      return null;
    }
    return str;
  };
  // 获取全部的键值对
  vm.getAll = function (): KeyValueObject[] {
    let List = [];
    for (let index = 0; index < localStorage.length; index++) {
      let temp = localStorage.key(index)!;
      let val = JSON.parse(localStorage.getItem(temp)!);
      console.log(val);
      if (typeof val != "object") {
        // 不是对象时需要尝试着继续解析
        try {
          val = JSON.parse(val);
        } catch {}
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
// 修饰原生的gitItem方法，对对象进行解析
function getStorageInit(key: string): any {
  let str: string | null = localStorage.getItem(key);
  if (str === null) {
    return null;
  }
  str = JSON.parse(str);
  if (str != null) {
    try {
      str = JSON.parse(str);
    } catch {}
  }
  return str;
}
