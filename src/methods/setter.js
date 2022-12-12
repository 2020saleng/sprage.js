export function setter(objectArgs){
   Object.keys(objectArgs).forEach(key=>{
        setItem(key,objectArgs[key])
    })
}

function setItem(key,value){
    localStorage.setItem(key,value)
}