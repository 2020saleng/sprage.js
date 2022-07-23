import {initMethods} from './init'
const date = require("./plugins/date");
interface pluginsObject {
  [key: string]: pluginsFunc;
}
class Sprage{
 protected autoClear: boolean;
  protected exclude: string[];
  static plugins: pluginsObject = {};
  constructor(option: KeyValueObject = { autoClear: true, exclude: [] }) {
    this.autoClear = option.autoClear;
    this.exclude = option.exclude ? option.exclude : [];
    const vm:any=this
    this.init(vm)
  }
 init(vm:any){
        console.log("1111")
        // initMethods(vm)
    }
 static install(name: string, descriptor: any) {
    Sprage.plugins[name] = descriptor;
  }
}
Sprage.install("time", new date().timeInvertFn);
module.exports = Sprage;