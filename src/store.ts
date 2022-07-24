import { initMethods } from "./init";
import {initPlugins} from './plugins/init'
const date = require("./plugins/date");
interface pluginsObject {
  [key: string]: pluginsFunc;
}
interface pluginsFunc {
  (...key: any): number;
}
interface KeyValueObject {
  [key: string]: any;
}
class Sprage {
  protected autoClear: boolean;
  protected exclude: string[];
  static plugins: pluginsObject = {};
  constructor(option: KeyValueObject = { autoClear: true, exclude: [] }) {
    this.autoClear = option.autoClear;
    this.exclude = option.exclude ? option.exclude : [];
    const vm: any = this;
    this.init(vm);
  }
 private init(vm: any) {
    initMethods(vm)
  }
  static install(name: string, descriptor: any) {
    this.plugins[name] = descriptor;
  }
}
// initPlugins(Sprage)
Sprage.install("time", new date().timeInvertFn);
export default Sprage