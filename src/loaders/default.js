function defaultCompiler(content){
    return content.toString()
}
export const defaultLoaders=[
    {
        type:'number',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return Number(compilered)
        }
    },
    {
        type:'string',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return compilered
        }
    },
    {
        type:'boolean',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return Boolean(compilered)
        }
    },
    {
        type:'undefined',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return undefined
        }
    },
    {
        type:'null',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return null
        }
    },
       {
        type:'symbol',
        compiler:(content)=>{
            return content.toString().slice(7,-1)
        },
        parse:(compilered)=>{
            return Symbol(compilered)
        }
    },
       {
        type:'bigint',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return BigInt(compilered)
        }
    },
       {
        type:'nan',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return NaN
        }
    },
       {
        type:'infinity',
        compiler:defaultCompiler,
        parse:(compilered)=>{
            return infinity
        }
    },
    {
        type:'object',
        compiler:(compilered)=>{return compilered},
        parse:(compilered)=>{
            return compilered
        }
    },
    {
        type:'array',
        compiler:(compilered)=>{return compilered},
        parse:(compilered)=>{
            return compilered
        }
    }
]