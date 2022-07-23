export function initClear(vm:any):void{
    vm.clear=function(){
        localStorage.clear();
    }
}