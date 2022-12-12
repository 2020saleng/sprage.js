import {initLoaders} from './loaders/init'
import {initMethods} from './methods/init'
function Sprage(options){
    this.$options=options
    initLoaders(this)
    initMethods(this)
}
export default Sprage;
