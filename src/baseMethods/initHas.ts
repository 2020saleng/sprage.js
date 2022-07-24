const utils = require("../utils.ts");
// 初始化has方法
export function initHas(vm: any) {
  vm.has = function (key: string): boolean {
    return !utils.isNull(localStorage.getItem(key));
  };
}
