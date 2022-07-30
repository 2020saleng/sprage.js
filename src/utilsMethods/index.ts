// 初始化其他方法
export function initUtilsMethods(vm: any) {
  // 返回当前内存容量，参数是一个布尔值，表示返回的是字符串还是数字
  vm.size = function (isNumber: boolean = false): string | number {
    let size =
      Object.entries(localStorage)
        .map((val) => val.join(""))
        .join("").length / 1024;
    return isNumber ? size.toFixed(2) : size.toFixed(2) + "KB";
  };
  // 返回剩余容量，参数是一个布尔值，表示返回的是字符串还是数字
  vm.surplus = function (isNumber: boolean = false): string | number {
    let sum: number = 5 * 1024;
    let cache = <number>vm.size(true);
    return isNumber
      ? (sum - cache).toFixed(2)
      : (sum - cache).toFixed(2) + "KB";
  };
  // 表示继续添加一个值后是否会让内存溢出
  vm.isFull = function (param?: number): boolean {
    if (param) {
      return !(Number(vm.size(true)) + Number(param) < 5 * 1024);
    }
    return !(vm.surplus(true) > 0);
  };
}
