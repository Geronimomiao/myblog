---
title: KOA 源码解读
---

## listen 过后发生了什么
```js
  //   application.js

  //   将传入的函数放入  middleware  数组
  //    每个函数有 2 个参数  ctx,   next
  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    this.middleware.push(fn);
    return this;
  }

  callback() {
    //  对 middleware  进行组合  实现洋葱模型的关键
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);
    const handleRequest = (req, res) => {
      //   对 req, res 进行加工  创建 ctx 对象  
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  //   同过 http  模块监听对应的端口
  listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
```

## 实现洋葱模型核心
```js
//  koa-compose.js
function compose (middleware) {
  //  检测传入 middle  数组 
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */
   //  返回一个函数   接受2个参数
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        //   遍历  middleware  中每一项  
        //   将后一项 当作第二个参数传入  
        //    在不断的 Promise.resolve 中去实现递归 dispatch 函数，最终实现顺序控制执行所有中间件函数
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

## 其余代码作用
主要 创建 ctx 对象  将原生 req  res 代理到  ctx  上 
[传送门](https://github.com/YOLO0927/koa2-source-code-analysis)

## 小结
KOA  实际上 通过 http 模块创建 sever 并监听相应端口
实现洋葱模型的核心  koa-compose.js  巧妙利用 递归 和 js 的闭包特性 
完成洋葱模型