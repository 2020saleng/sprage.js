// 初始化清除的方法
export function initClear(vm: any): void {
  vm.clear = function () {
    localStorage.clear();
  };
}
