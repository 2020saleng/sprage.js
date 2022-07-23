import { initGet } from "./baseMethods/initGet";
import { initRemove } from "./baseMethods/initRemove";
import { initHas } from "./baseMethods/initHas";
import { initSetMethods } from "./setMethods/index";
import { initClear } from "./baseMethods/initClear";
import { initUtilsMethods } from "./utilsMethods/index";
export function initMethods(vm: any): void {
  initUtilsMethods(vm);
  initSetMethods(vm);
  initHas(vm);
  initRemove(vm);
  initGet(vm);
  initClear(vm);
}
