export function initSetCount(vm:any){
    vm.setCount=function(params: KeyValueObject, count: number) {
    for (let item in params) {
      params.hasOwnProperty(item)
        ?vm.remove(item) &&
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
  vm.setOnce=function(params: KeyValueObject) {
    this.setCount(params, 1);
  }
}