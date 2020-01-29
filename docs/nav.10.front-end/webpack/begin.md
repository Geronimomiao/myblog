# 起
**What**
* 前端打包工具

![enter description here](https://img.wsmpage.cn/learning/2019-10-14/1571009402216.png)



**Begin**

```
yarn add webpack webpack-cli
```

*  配置文件
	* 默认 webpack.config.js
	* webpack --config (可通过该命令指定配置文件

* 配置文件组成
	* entry        ----    打包入口文件
	* output     ----     打包输出 
	* mode      ----     环境
	* module   ----     Loader 配置
	* plugins   ----      插件配置

**entry**

* 单入口
``` javascript
module.exports = {
	entry: './src/index.js'
};
```

* 多入口
``` javascript
module.exports = {
	entry: {
		app: './src/app.js',
		adminApp: './src/adminApp.js'
	}
};
```

**output**

``` 
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // 如果是多入口 则需要 [name] 来占位
	filename: "[name].js"
  },
  mode: 'production'
};
```

![enter description here](https://img.wsmpage.cn/learning/2019-10-14/1571015648832.png)


**loaders**
* webpack 开箱即用 只支持js json 两种类型 通过 Loader 去支持其他文件类型 并且把它们转化成有效的模块 可以添加到依赖图中
* 本身是一个函数 接受源文件作为参数 返回转换结果

* 常见 loader
	* babel-loader
	* css-loader
	* less-loader
	* ts-loader
	* file-loader // 图片 字体等的打包
	* raw-loader // 将文件以字符串的形式导入
	* thread-loader // 多进程打包 css js
	* url-loader // 图片是否打包为 base64

``` javascript
module.exports = {
	module: {
		rules:[{
			test: /\.txt$/,    // 指定匹配规则
			use: 'raw-loader'  // 指定使用 loader 名称
		}]
	}
};
```

**plugins**
* 插件用于 bundle 文件优化 资源管理和环境变量注入
* 作用于整个构建过程

* 常见 plugins
	* CommonsChunkPlugin // 将 chunks 相同的模块代码 提取成公共 js
	* ClearWebpackPlugin // 清理构建目录
	* ExtractTextWebpackPlugin // 将 css 从 bunlde 文件中提取成一个独立的 css 文件
	* CopyWebpackPlugin // 将 文件 或者 文件夹拷贝到输出目录
	* HtmlWebpackPlugin //  创建 html 文件去承载输出的 bundle
	* UglifyjsWebpackPlugin  // 压缩 js
	* ZipWebpackPlugin // 将打包出的资源生成一个 zip

``` javascript
module.exports = {
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' })
	]
};
```

**mode**
* 指定当前构建环境 production development none ( 默认 production
* webpack 会根据 mode 的值 去默认开启一些插件


****
package.json
```

{
  "name": "webpack-demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^4.41.1",
    "webpack-cli": "^3.3.9"
  },
  "scripts":{
    // 模块局部安装会在 node_modules/.bin 目录创建软链接
    "build": "webpack"
  }
}

```