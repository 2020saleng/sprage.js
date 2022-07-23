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
export function initGet(vm: any): void {
  vm.get = function (param: string) {
    let str: string | tokenObject | KeyValueObject = getStorageInit(param);
    if (typeof str == "string") {
      return str
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
  };
  vm.getAll = function (): KeyValueObject[] {
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
  };
}
function getStorageInit(key: string): any {
  let str: string | null = localStorage.getItem(key);
  if(str===null){return null}
  str=JSON.parse(str)
  if(str!=null){
    try{
     str=JSON.parse(str)
    }catch{
    }
    }
  return str 
}
