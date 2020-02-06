## Set 方法作用及意义
> Vue 无法探测新增属性和删除属性
>  对数组元素的部分方法 无法实现动态检测

```js
export function set(target: Array<any> | Object, key: any, val: any): any {
  // 判断target是否为undefined、nul1或原始类型
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target)}`)
  }
  /**
   * 判断targrt是否为数组并且key是否是一个有效的索引,如果是，
   * 则取target.1ength与key两者的最大值赋给target.length
   * 然后通过数组的splice方法将val添加到key索引处
   * splice 方法会触发视图层更新
   */
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 不是数组，即认为是对象
  /**
   * 判断key是否已经存在与对象中
   * 若存在，表示只是简单的修改对象中的属性，
   * 则直接使用target[key]=val修改即可
   */
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  /**
   * 获取target的ob_属性，并判断target是不是vue实例以及是否为根数据对象
   * 如果是，则报出警告并终止运行
   */
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  /**
   * 判断target的_ob属性是否存在，_ob属性的存在与否标志target是否是一个响应式数据若_ob属性
   * 不存在，表示target不是一个响应式对象，那么仅需修改属性即可，不需要触发视图更新通知
   */
  if (!ob) {
    target[key] = val
    return val
  }
  /**
   * 若ob属性存在，表示target是一个响应式对象，
   * 那么使用defineReactive(ob.value，key，val)将key和val添加到target上，并将其设置为响应式
   * 最后触发视图更新通知
   */
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
