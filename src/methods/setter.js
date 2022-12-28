export function setter(objectArgs){
   Object.keys(objectArgs).forEach(key=>{
        setItem(key,objectArgs[key],this)
    })
}

function setItem(key,value,vm){
     value=vm.compiler.compiler(value)
    localStorage.setItem(key,value)
}