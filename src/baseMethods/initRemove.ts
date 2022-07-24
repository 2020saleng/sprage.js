// 初始化remove方法
export function initRemove(vm: any) {
  vm.remove = function (param: string | string[]): boolean {
// 根据参数类型进行处理
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
//对原生removeItem进行处理
function removeItem(vm: any, param: string): void {
  console.log(param);
  vm.has(param) ? localStorage.removeItem(param) : null;
}
