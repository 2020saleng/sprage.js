import { getter }  from './getter'
import { setter }  from './setter'
import { remove }  from './remove'
import { clear  }  from './clear'
export  function initMethods(vm){
    const MethodsPool={
        get:getter,
        set:setter,
        remove:remove,
        clear:clear
    }
    vm.methods=MethodsPool
    Object.keys(vm.methods).forEach(method=>{
        vm[method]=MethodsPool[method]
    })
}