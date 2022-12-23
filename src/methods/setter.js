import {compiler} from '../compiler/index'

export function setter(objectArgs){
   Object.keys(objectArgs).forEach(key=>{
        setItem(key,objectArgs[key])
    })
}

function setItem(key,value){
     value=compiler(value)
    localStorage.setItem(key,value)
}