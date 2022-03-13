class TimeInver {
  private unitList = ["s", "min", "h", "day"];
  private timeList = [1000, 60000, 3600000, 86400000];
  constructor() {}
  formatTimeInvert(param: string) {
    const utils = require("../utils");
    return utils.formatTimeInvert.call(this, param);
  }
  getIndex(param: string): number | undefined {
    for (let i = 0; i < this.unitList.length; i++) {
      if (param.indexOf(this.unitList[i]) != -1) {
        return i;
      }
    }
    return undefined;
  }
  afterTime(param: string, index: number): number {
    const now = new Date().getTime();
    let time = Number(
      param.slice(0, param.length - this.unitList[index].length)
    );
    if (isNaN(time)) {
      throw "time should be a number";
    }
    return now + time * this.timeList[index];
  }
  afterTimeInvert(param: string) {
    param = param.trim();
    let index: number | undefined = this.getIndex(param);
    if (index === undefined) {
      throw "unit is wrongfulness";
    }
    return this.afterTime(param, index);
  }
  timeInvert(params: string) {
    return params.includes("-")
      ? this.formatTimeInvert(params)
      : this.afterTimeInvert(params);
  }
  timeInvertFn(params: string) {
    let time = new TimeInver();
    return time.timeInvert.call(time, params);
  }
}
module.exports = TimeInver;
