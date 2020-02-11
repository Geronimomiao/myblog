---
title: 用Promise封装 
---
## 用 Promise 封装 ajax

```js
function getJSON (url) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.responseText, this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send()
    })
}



function postJSON(url, data) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }

        xhr.send(JSON.stringify(data))
    })
}


getJSON('/api/v1/xxx') .then( value => {
  // dosomething          
}).catch( error => {
  // dosomething         
})

```

## 用 Promise 封装 fetch

```js
class Ajax {
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
  // post方式
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
  }


  //put 修改
  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))

    })
  }

  //delete
  delete(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve('数据删除成功!'))
        .catch(err => reject(err))
    })
  }
}
export default new Ajax();//ES6导出


//  使用
import http from "./http.js"//引入方式 这里用的是ES6的方法，需要babel配合webpack打包
//普通引入使用src引入之后  const http = new Ajax();   即可
// get请求数据
http.get('http://jsonplaceholder.typicode.com/users')
  .then((data) => {
    console.log(data)
  })
  .catch(err => console.log(err))

// post传输数据
const data = {
  name: 'candy',
  username: 'candy',
  email: 'htmlcs@163.com'
};
//post user
http.post('http://jsonplaceholder.typicode.com/users', data)
  .then(data => console.log(data))
  .catch(err => console.log(err))

// update user ,修改后会发现修改后ID为2的数据会变成上页面定义的data
http.put('http://jsonplaceholder.typicode.com/users/2', data)
  .then(data => console.log(data))
  .catch(err => console.log(err))


//delete user 删除下标为2里的数据  

http.delete('http://jsonplaceholder.typicode.com/users/2', data)
  .then(data => console.log(data))
  .catch(err => console.log(err)) 

```

