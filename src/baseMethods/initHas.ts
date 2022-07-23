const utils = require("../utils.ts");
export function initHas(vm: any) {
  vm.has = function (key: string): boolean {
    return !utils.isNull(localStorage.getItem(key));
  };
}
