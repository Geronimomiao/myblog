---
title: JWT与SSO
---

## Cookie 与 Session
#### cookie
在服务端返回数据时 通过Set-Cookie设置
下次浏览器请求会自动带上 是键值对的 可设置多个
子域名可以访问主域名下的 Cookie

* 属性
  * max-age 和 expires 设置过期时间
  * secure 只在 https 时发送
  * HttpOnly 无法通过 document.cookie 访问

#### session
1、用户向服务器发送用户名和密码。
2、服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
3、服务器向用户返回一个 session_id，写入用户的 Cookie。
4、用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。
5、服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。

**补充**
Session 与 Cookie 无直接联系 通常将 session_id 存入 cookie 
也可以通过存入其他字段 来实现

## JWT
* 由3部分组成
    * Header（头部）
    * Payload（负载）
    * Signature（签名）
```Header.Payload.Signature```

**Header**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
Header值将上面的 JSON 对象使用 Base64URL 算法（详见后文）转成字符串

**Payload**
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
可放置一些自定义字段  默认时不加密的 不要放置私密信息


**Signature**
```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```
需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256）
可有效降低数据库查询次数

[传送门](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

## SSO
单点登录( Single Sign On ，简称 SSO），是目前比较流行的企业业务整合的解决方案之一，用于多个应用系统间，用户只需要登录一次就可以访问所有相互信任的应用系统

#### 同域名
当访问同域名下的页面时，Cookie 和单系统登录时一样，会正常携带，后台服务即可直接获取到对应的 SessionID 值，后台为单服务还是多服务无差别

#### 不同子域名
子域名间 Cookie 是不共享的，但各子域名均可获取到父级域名的 Cookie，即 app.demo.com与 news.demo.com均可以获取 demo.com域名下的 Cookie。所以可以通过将 Cookie 设置在父级域名上，可以达到子域名共享的效果，即当用户在 app.demo.com 域名下登录时，在demo.com域名下设置名为 SessionID 的 Cookie，当用户之后访问news.demo.com时，后台服务也可以获取到该 SessionID，从而识别用户

#### 完全不同域名
前端跨域带 Cookie
```json
xhrFields: {
  withCredentials: true
}
```
tip: CORS 开启 withCredentials 时，浏览器不支持使用通配符*，需明确设置可跨域访问的域名名单
[传送门](https://mp.weixin.qq.com/s/MN9GzcSPXMnM48ZYMrjwgg)
