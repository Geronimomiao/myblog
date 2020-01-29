---
title: options 请求
time:  2019-11-15
author: wsm
mail: 1030057982@qq.com
---
 
作用 
****
> 其实在正式跨域之前，浏览器会根据需要发起一次预检（也就是option请求），用来让服务端返回允许的方法（如get、post），被跨域访问的Origin（来源或者域），还有是否需要Credentials(认证信息)等 

预检与非预检
****
>  浏览器将CORS请求分为两类：简单请求（simple request）和非简单请求（not-simple-request）,简单请求浏览器不会预检，而非简单请求会预检

```
let a = '请求方法为 GET、POST、HEAD'
let b = '请求头限制这几种字段 Accept、Accept-Language、Content-Language、Content-Type、Last-Event-ID'
let c = 'Content-type 为 application/x-www-form-urlencoded、multipart/form-data、text/plain'

if(a&&b&&c) {
	console.log('simple request')
} else {
	console.log('not simple request')
}
```

> 简单请求，浏览器直接请求，会在请求头信息中，增加一个origin字段，来说明本次请求来自哪个源（协议+域名+端口）。服务器根据这个值，来决定是否同意该请求，服务器返回的响应会多几个头信息字段

```
Access-Control-Allow-Origin 该字段是必须的，* 表示接受任意域名的请求，还可以指定域名
Access-Control-Allow-Credentials 该字段可选，是个布尔值，表示是否可以携带cookie
Access-Control-Allow-Headers 该字段可选，里面可以获取Cache-Control、Content-Type、Expires等
```

> 非简单请求是对那种对服务器有特殊要求的请求，比如请求方式是PUT或者DELETE，或者Content-Type字段类型是application/json。都会在正式通信之前，增加一次HTTP请求，称之为预检。浏览器会先询问服务器，当前网页所在域名是否在服务器的许可名单之中，服务器允许之后，浏览器会发出正式的XMLHttpRequest请求

> 一旦服务器通过了“预检”请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样