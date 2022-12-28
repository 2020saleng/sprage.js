export function getter(key){
   const value= localStorage.getItem(key)
   return this.compiler.parse(value)
}