const date = require("./plugins/date");
const utils = require("./utils.ts");
// 一般的对象接口
interface KeyValueObject {
  [key: string]: any;
}
// 涉及到私有对象的接口
interface tokenObject {
  _Val: string | object;
  _token_: number;
  _count_: number;
}
// 遍历对象的方法中取键值的函数接口
interface func {
  (key: string, value: string | KeyValueObject): void;
}
// 插件函数的接口
interface pluginsFunc {
  (...key: any): number;
}
// 插件对象的接口
interface pluginsObject {
  [key: string]: pluginsFunc;
}
class Sprage {
  // 静态插件对象
  static plugins: pluginsObject = {};
  constructor() {
 
  }
  get(param: string) {
    let str: string | tokenObject | KeyValueObject = this.getFirst(param);
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
        let count: number = str._count_ - 1;
        this.setCount({ [param]: str._Val }, count);
        return str._Val;
      }
      this.remove(param);
      return null;
    }
    return str;
  }
  // 获取并用JSON解析localStorage某个键的函数
  private getFirst(key: string): any {
    let str: string | null = localStorage.getItem(key);
    return str == null ? null : JSON.parse(str);
  }
  set(
    param: string | KeyValueObject,
    val?: string | KeyValueObject,
    expiration?: number
  ): boolean {
    if (typeof param == "string" && val) {
      if (utils.isNull(val)) {
        throw "The value cannot be empty";
      }
      localStorage.setItem(param, JSON.stringify(val));
    } else if (typeof param == "object") {
      for (let item in param) {
        param.hasOwnProperty(item)
          ? localStorage.setItem(item, JSON.stringify(param[item]))
          : null;
      }
    } else {
      return false;
    }
    return true;
  }
  // 判断某个键值是否存在
  has(key: string): boolean {
    return !utils.isNull(localStorage.getItem(key));
  }
  // 删除某个键值，支持使用数组批量删除
  remove(param: string | string[]): boolean {
    try {
      if (typeof param == "string") {
        this.removeItem(param);
      } else {
        param.forEach((element) => {
          this.removeItem(element);
        });
      }
      return true;
    } catch {
      return false;
    }
  }
  // 调用API删除某个键的函数
  private removeItem(param: string): void {
    this.has(param) ? localStorage.removeItem(param) : null;
  }
  // 清除所有函数
  clear(): void {
    localStorage.clear();
  }
  // 设置使用次数的函数,要求使用对象语法
  setCount(params: KeyValueObject, count: number) {
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
  setOnce(params: KeyValueObject) {
    this.setCount(params, 1);
  }
  // 设置过期时间的方法,会使用一个叫time的,可自定义的插件
  setTime(params: KeyValueObject, expiration: number | string): void {
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
  getAll(): KeyValueObject[] {
    let List = [];
    for (let index = 0; index < localStorage.length; index++) {
      let temp = localStorage.key(index)!;
      let val = JSON.parse(localStorage.getItem(temp)!);
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
  forEach(fn: func): void {
    let List = this.getAll();
    List.forEach((e) => {
      for (let key in e) {
        let value = e[key];
        fn(key, value);
      }
    });
  }
  // 使用插件
  static install(name: string, descriptor: any) {
   Sprage.plugins[name] = descriptor;
  }
}
Sprage.install("time", new date().timeInvertFn);
module.exports = Sprage;
