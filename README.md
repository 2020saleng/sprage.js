# sprage.js

一款基于 localstorage 的轻量级本地存储工具

- 支持批量存储
- 支持序列化
- 支持设置过期时间
- 支持多种日期格式
- 支持定义使用次数
- 可检测占用空间和剩余空间
- 可自动清除空间
- 时间戳处理可自定义插件

## 安装

使用 npm 安装

```bash
$ npm install sprage
```

使用 yarn 安装

```bash
$ yarn add sprage
```

## 引入

使用 require 引入：

```js
    cosnt Sprage=require('sprage');
    let sprage=new Sprage();
```

使用 import 引入：

```js
import Sprage from "sprage";
let sprage = new Sprage();
```

使用 cdn 引入

```js
<script src="https://cdn.jsdelivr.net/npm/sprage@1.1.2/dist/Sprage.min.js"></script>
```

## 基本用法

```js
let sprage = new Sprage();
// 设置存储的键值对
sprage.set("foo", "boo");
console.log(sprage.get("foo")); //'boo'

// 可以用对象的形式进行批量存储
sprage.set({
  name: "strage",
  age: "20",
});
console.log(sprage.get("name")); //strage
console.log(sprage.get("age")); //'20'

// 可以存储对象
sprage.set("msg", {
  title: "ts",
  num: 12,
});

console.log(sprage.get("msg")); //{title: 'ts',num: 12}

// 检验是否存入了某个值
console.log(sprage.has("foo")); //true

// 批量删除
sprage.remove(["foo", "name", "age"]);
console.log(sprage.get("foo")); //null

// 设置过期时间
sprage.setTime(
  {
    time: "24h",
  },
  "30min"
); //30分钟后过期

sprage.setTime(
  {
    time: "24h",
  },
  "2022-3-12"
); //指定过期的日期

sprage.setTime(
  {
    time: "24h",
  },
  new Date().getTime() + 10000
); //传入指定的时间戳

//设置可使用次数
sprage.setCount({ count: 5 }, 3); //取出三次后失效

//或者可以使用语法糖
sprage.setOnce({ count: 1 }); //取出一次后失效

//清除全部缓存
sprage.clear();

//获取全部缓存
sprage.getAll(); //获取到的是一个对象数组，每个对象是一个存入的键值对

//对所有存入的键值对进行操作
store.forEach((key, val) => {
  // key,val分别是每一个存入的键和值
});
// 检测已经占用的空间和剩余空间
console.log(sprage.size()); //已经使用117.00KB
console.log(sprage.surplus()); //剩余空间4943.00KB
```

## 自动清除内存占用

一般来说，为了放在误删重要的存储信息，这个功能是默认关闭的，但如果你在开发中需要存储比较大的信息且需要动态分配存储空间，那么这个功能是一个很好的选择，sprage 会给根据存储时间来删除那些更早存储的信息，如果你有一些重要的信息需要保留，可以通过设置 exclude 保留他们

```js
let sprage = new Sprage({
  autoClear: true, //开启自动清除缓存
  exclude: ["only"], //设置不会被删除的键值
});
const char = "0";
let count = (9 * 1024 * 1024) / 2;
let content = new Array(count).fill(char).join("");
sprage.set("only", "1");
sprage.set("long", content); //这个信息的长度会占用很大的空间
sprage.set("long2", content); //存储这个信息时，内存空间已经不够用了，此时会清除那些不在exclude中的数据
sprage.getAll(); //[{only: '"1"'}{long2: '00000000...'}]
```

sprage 清除缓存是按键值对清除的，并不会对 localstrage 进行扩容。sprage 其内部会按存入时间顺序不断删除已有的键值对，直到剩余的存储空间足够存储需要存储的信息

## 使用插件

sprage 的时间戳处理采用了内置的插件，足够适配大多数场景，但如果有特殊需求，可以使用自定义的插件来实现更灵活的时间戳处理

```js
Sprage.install("time" /*plugins*/);
```

插件是一个函数，传入的参数是接收到的日期参数，返回值应该是一个数值类型的时间戳

## 兼容性

### 浏览器兼容情况

- IE 8.0+
- Chrome 4.0+
- Firefox 3.0+
- Opera 10.5+

### 移动端兼容情况

- IPhone 2.0+
- Android 2.0+

## 源码

源码已放在 gitee，供大家学习交流

https://gitee.com/yan-taomeng/sprage.js

