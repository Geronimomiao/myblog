---
title: 模板编译
---

## Preface
![](https://img-blog.csdnimg.cn/20200203072154809.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)

>  在开发中，在<template></template>标签中除了写一些原生HTML的标签，我们还会写一些变量插值，如，或者写一些Vue指令，如v-on、v-if等。而这些东西都是在原生HTML语法中不存在的，不被接受的。但是事实上我们确实这么写了，也被正确识别了，页面也正常显示了，这又是为什么呢？

## What&Why
>  把用户在<template></template>标签中写的类似于原生HTML的内容进行编译，把原生HTML的内容找出来，再把非原生HTML找出来，经过一系列的逻辑处理生成渲染函数，也就是render函数的这一段过程称之为模板编译过程

## How

1. 模板解析阶段：将一堆模板字符串用正则等方式解析成抽象语法树AST
2. 优化阶段：遍历AST，找出其中的静态节点，并打上标记
3. 代码生成阶段：将AST转换成渲染函数

```js
// 源码位置: /src/complier/index.js

export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 模板解析阶段：用正则等方式解析 template 模板中的指令、class、style等数据，形成AST
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化阶段：遍历AST，找出其中的静态节点，并打上标记；
    optimize(ast, options)
  }
  // 代码生成阶段：将AST转换成渲染函数；
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```
* const ast =parse(template.trim(), options):
  * parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。
* optimize(ast, options): optimize 的主要作用是标记静态节点
  * 这是 Vue 在编译过程中的一处优化，挡在进行patch 的过程中， DOM-Diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。
* const code =generate(ast, options):
  * 将 AST 转化成 render函数字符串的过程，得到结果是 render函数 的字符串以及 staticRenderFns 字符串。

