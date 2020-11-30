---
title: React 16+ 新特性
---

## Render 返回新类型

- 返回类型
  - 单个元素
  - 数组(新增)
  - 字符串(新增)

## Portals

- 把组件渲染到当前组件树以外的 DOM 节点上

```jsx
ReactDOM.createPortal(children, container)
```

## 自定义 DOM 属性
- 将不识别的属性传递给 DOM 元素
