import {defaultLoaders} from './default'
export function initLoaders(vm){
    let loaderObject={}
    defaultLoaders.forEach((loader,index)=>{
        loader.key=index
        loaderObject[loader.type]=loader
    })
    vm.loaders=loaderObject
}