#  new Vue()

* 读一波源码
    * 传入的 options 对象 
    * Vue 对实例对象进行各种初始化
    * 对 el 执行 $mount  方法 
        * 核心 获得 render 方法 对数据进行渲染

****
```js
//  只贴核心部分
function Vue (options) {
  this._init(options)
}


Vue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // expose real self
  vm._self = vm
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}


Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}



export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  callHook(vm, 'beforeMount')

  let updateComponent = () => {
      //  vm._render()   渲染出  Vnode
      vm._update(vm._render(), hydrating)
  }

  //  渲染 Watcher  本质观察者模式
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```   

