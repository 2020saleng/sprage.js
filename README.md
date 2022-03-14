# sprage.js

一款基于localstorage的轻量级本地存储工具

* 支持批量存储
* 支持序列化
* 支持设置过期时间
* 支持多种日期格式
* 支持定义使用次数
* 可检测占用空间和剩余空间
* 时间戳处理可自定义插件

## 安装

使用npm安装
```bash
$ npm install sprage
```
使用yarn安装
```bash
$ yarn add sprage
```

## 引入

使用require引入：
``` js
    cosnt Sprage=require('sprage');
    let sprage=new Sprage();
```

使用import引入：
``` js
    import Sprage from 'sprage'
    let sprage=new Sprage()
```
使用cdn引入
```js
<script src="https://cdn.jsdelivr.net/npm/sprage@1.1.2/dist/Sprage.min.js"></script>
```

## 基本用法


```js
        let sprage= new Sprage()
        // 设置存储的键值对
        sprage.set('foo', 'boo')
        console.log(sprage.get('foo')) //'boo'

        // 可以用对象的形式进行批量存储
        sprage.set({
            name: 'strage',
            age: '20'
        })
        console.log(sprage.get('name')) //strage
        console.log(sprage.get('age')) //'20'

        // 可以存储对象
        sprage.set(
            'msg', {
                title: 'ts',
                num: 12
            }
        )

        console.log(sprage.get('msg')) //{title: 'ts',num: 12}

        // 检验是否存入了某个值
        console.log(sprage.has('foo')) //true

        // 批量删除
       sprage.remove(['foo', 'name', 'age'])
        console.log(sprage.get('foo')) //null

        // 设置过期时间
       sprage.setTime({
            time:'24h'
        },'30min')//30分钟后过期

        sprage.setTime({
            time:'24h'
        },'2022-3-12')//指定过期的日期

        sprage.setTime({
            time:'24h'
        },new Date().getTime()+10000)//传入指定的时间戳

        //设置可使用次数
        sprage.setCount({count:5},3) //取出三次后失效

        //或者可以使用语法糖
        sprage.setOnce({count:1})//取出一次后失效

        //清除全部缓存
        sprage.clear()

        //获取全部缓存
        sprage.getAll()//获取到的是一个对象数组，每个对象是一个存入的键值对

        //对所有存入的键值对进行操作
        store.forEach((key,val)=>{
            // key,val分别是每一个存入的键和值
        })
        // 检测已经占用的空间和剩余空间
        console.log(store.size())   //已经使用117.00KB
        console.log(store.surplus()) //剩余空间4943.00KB
```

## 使用插件

sprage的时间戳处理采用了内置的插件，足够适配大多数场景，但如果有特殊需求，可以使用自定义的插件来实现更灵活的时间戳处理

```js
 Sprage.install("time",/*plugins*/ )
```
插件是一个函数，传入的参数是接收到的日期参数，返回值应该是一个数值类型的时间戳

## 兼容性

### 浏览器兼容情况
* IE 8.0+
* Chrome 4.0+
* Firefox 3.0+
* Opera 10.5+

### 移动端兼容情况
* IPhone 2.0+
* Android 2.0+

## 源码

源码已放在gitee，供大家学习交流

https://gitee.com/yan-taomeng/sprage.js