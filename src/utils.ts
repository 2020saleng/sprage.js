module.exports = {
  /**
   *  检验一个参数是否为null
   * @param {any} val - 检验参数.
   */
  isNull: function (val: any): boolean {
    return !val && typeof val != undefined && val != 0;
  },
  /**
   *  检验一个参数是否为NAN
   * @param {any} val - 检验参数.
   */
  isNAN: function (val: any): boolean {
    return Object.is(val, NaN);
  },
  /**
   *  检验当前时间是否超过了设置的时间
   * @param {number|string} param - 检验参数,需要是数字或字符类型的时间戳.
   */
  checkTime: function (param: number | string): boolean {
    return Number(param) > new Date().getTime();
  },
  /**
   *  格式化标准时间
   * @param {string} param- 对可以被Date对象转化为时间戳的参数进行转化
   */
  formatTimeInvert: function (param: string): number {
    return new Date(param).getTime();
  },
};
