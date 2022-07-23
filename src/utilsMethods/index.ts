export function initUtilsMethods(vm:any){
      vm.size=function(isNumber: boolean = false): string | number {
    let size =
      Object.entries(localStorage)
        .map((val) => val.join(""))
        .join("").length / 1024;
    return isNumber ? size.toFixed(2) : size.toFixed(2) + "KB";
  }
      vm.surplus=function(isNumber: boolean = false): string | number {
    let sum: number = 5 * 1024;
    let cache = <number>vm.size(true);
    return isNumber
      ? (sum - cache).toFixed(2)
      : (sum - cache).toFixed(2) + "KB";
  }
    vm.isFull=function(param?: number): boolean {
    if (param) {
      return !(Number(vm.size(true)) + Number(param) < 5 * 1024);
    }
    return !(vm.surplus(true) > 0);
  }
}