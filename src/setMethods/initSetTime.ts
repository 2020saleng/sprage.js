interface KeyValueObject {
  [key: string]: any;
}
export function initSetTime(vm: any): void {
  vm.setTime = function (
    params: KeyValueObject,
    expiration: number | string
  ): void {
    console.log(this.constructor)
    let {constructor}=this
    expiration = constructor.plugins.time(expiration);
    if (typeof expiration != "string" || "number") {
      return;
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
