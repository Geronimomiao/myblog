---
title: 用 js 判断 PC端 / 移动端
---

## 核心

>    navigator.userAgent   通过匹配其中关键字
```js
App.vue中

export default {
  name: 'App',
  methods: {
    // 判断移动端还是pc端
    <!--_isMobile方法-->
    _isMobile(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
  mounted: function() {
    if (this._isMobile()) {
      alert('手机端');
      <!--移动端首页路由-->
      this.$router.replace('/homeAndroid');
    }else {
      alert('pc端');
      <!--pc端首页路由-->
      this.$router.replace('/Home');
    }
  },
}

```