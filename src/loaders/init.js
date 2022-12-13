import {defaultLoaders} from './default'
export function initLoaders(vm){
    defaultLoaders.forEach((loader,index)=>{
        loader.key=index
    })
    vm.loaders=defaultLoaders
}