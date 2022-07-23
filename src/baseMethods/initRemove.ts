export function initRemove(vm:any){
    vm.remove=function(param: string | string[]): boolean {
    try {
      if (typeof param == "string") {
         removeItem(vm,param);
      } else {
        param.forEach((element) => {
          this.removeItem(vm,element);
        });
      }
      return true;
    } catch {
      return false;
    }
  }
}

function removeItem(vm:any,param: string): void {
    vm.has(param) ? localStorage.removeItem(param) : null;
  }