interface KeyValueObject {
  [key: string]: any;
}
// 初始化设置过去时间的方法
export function initSetTime(vm: any): void {
  vm.setTime = function (
    params: KeyValueObject,
    expiration: number | string
  ): void {
    let { constructor } = this;
    // 加载类上的插件方法
    expiration = constructor.plugins.time(expiration);
    // 类型检验
    let typeList: string[] = ["number", "string"];
    if (
      typeList.every((item) => {
        return typeof item == item;
      })
    ) {
      return;
    }
    // 遍历设置过期时间
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
