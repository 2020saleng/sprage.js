import {initLoaders} from './loaders/init'
import {initMethods} from './methods/init'
import { Compiler} from './compiler/index'
function Sprage(options){
    this.$options=options
    initLoaders(this)
    this.compiler=new Compiler(this)
    initMethods(this)
}
export default Sprage;
