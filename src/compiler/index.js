import {getType} from '../utils'
export class Compiler{
  constructor(options){
    this.loaders=options.loaders
  }
  getInitData(s=null,k=null,c=null,o=null){
    return Object.create({
      s,
      k,
      c,
      o
    })
  }
  compiler(value){
      const TYPE=getType(value)
      if(!this.loaders[TYPE]){return}
      if(TYPE=='object'){
          Object.keys(value).forEach(key=>{
            value[key]=this.compiler(value[key])
          })
      }
      if(TYPE=='array'){
        value.forEach((item,index)=>{
            value[index]=this.compiler(item)
        })
      }
      const compilerTypeContent=this.loaders[TYPE].compiler
      const key=this.loaders[TYPE].key
      const InitData=this.getInitData(compilerTypeContent(value),key)
      return this.jsonStringify(InitData)
  }
  parse(string){
      const row=this.jsonParse(string)
      if(!row.s){
          Object.keys(key=>{
            row[key]=this.parse(row[key])
          })
      }
      const key=row.k
      const parseLoader=Object.values(this.loaders).find(loader=>{
        return loader.key==key
      })
      if(!parseLoader){return}
      return parseLoader.parse(row.s)
  }
  jsonStringify(object){
    return JSON.stringify(object)
  }
  jsonParse(string){
    if(!typeof string=='string'){
      return string
    }
    return JSON.parse(string)
  }
}

