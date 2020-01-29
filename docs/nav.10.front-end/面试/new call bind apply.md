## new
****
```js
function  myNew(fn, ...args) {
    let obj = {}
    Object.setPrototypeOf(obj, fn)
    let result =  fn.apply(obj, args)

    return typeof  result === 'object' ? result : obj
}
```

## bind
****
```js
Function.prototype.myBind = function(ctx=window, ...args1) {
    let self = this
    function bFn(...args2) {
        return  self.apply(this instanceof  bFn ?  this :  ctx,  args1.concat(args2))
    }
    bFn.prototype =  this.prototype
    return bFn
}
```


## call
****
```js
Function.prototype.myCall = function (ctx=window, ...args) {
    ctx.fn = this
    let result =  ctx.fn(...args)
    delete ctx.fn

    return result
}
```


## apply
****
```js
Function.prototype.myApply = function (ctx=window, arr) {
    ctx.fn = this
    let result =  ctx.fn(...arr)
    delete ctx.fn

    return result
}
```