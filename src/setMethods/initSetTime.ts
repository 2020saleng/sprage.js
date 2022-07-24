interface KeyValueObject {
  [key: string]: any;
}
export function initSetTime(vm: any): void {
  vm.setTime = function (
    params: KeyValueObject,
    expiration: number | string
  ): void {
    let { constructor } = this;
    expiration = constructor.plugins.time(expiration);
    let typeList:string[]=['number','string']
    if( typeList.every((item)=>{return typeof item==item})){
        return
    }
    for (let item in params) {
      params.hasOwnProperty(item)
        ? localStorage.setItem(
            item,
            JSON.stringify({
              _Val: params[item],
              _token_: expiration,
            })
          )
        : null;
    }
  };
}
