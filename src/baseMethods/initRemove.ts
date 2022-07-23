export function initRemove(vm: any) {
  vm.remove = function (param: string | string[]): boolean {
    try {
      if (typeof param == "string") {
        removeItem(vm, param);
      } else {
        param.forEach((element) => {
          removeItem(vm, element);
        });
      }
      return true;
    } catch(e) {
      return false;
    }
  };
}

function removeItem(vm: any, param: string): void {
    console.log(param)
  vm.has(param) ? localStorage.removeItem(param) : null;
}
