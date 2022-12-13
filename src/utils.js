export function getType(variable){
        let toString = Object.prototype.toString;
        let dataType = variable instanceof Element ? "element" : toString.call(variable).replace(/\[object\s(.+)\]/, "$1").toLowerCase()
        dataType=dataType=='number'?getSpecialNumberType(variable):dataType
        return dataType
}
function getSpecialNumberType(number){
    if(_isNaN(number)){
        return 'nan'
    }
    if(number.toString()=='Infinity'){
        return 'infinity'
    }
    if(number.toString()=='-Infinity'){
        return '-infinity'
    }
    return 'number'
}

function _isNaN(number){
    return Object.is(number,NaN)
}