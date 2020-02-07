---
title: position&display取值及用法
---

## position
*  absolute
   *  生成绝对定位的元素，相对于 static 定位以外的第一个祖先元素进行定位  
   *  绝对定位的元素则脱离了文档流。在布置文档流中其它元素时，绝对定位元素不占据空间
*  fixed
   *  生成固定定位的元素，相对于浏览器窗口进行定位 ( 在滚动屏幕时仍固定在相同位置的元素
*  inherit
*  initial
*  relative
   *  生成相对定位的元素，相对于其在普通流中的位置进行定位  
   *  在文档中的正常位置偏移给定的值，但是不影响其他元素的偏移
*  static
   *  该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效  
*  sticky
   *  页面滑动到“临界点”之前表现为 relative, 到达“临界点”时表现为 fixed
   *  Sticky 效果只在 Containing Block 内有效，Containing Block 滑出屏幕时，Stickey Element 也跟着滑走
*  unset 

## display
* none 
    *  元素从可访问性树中移除 
* block 
    *  此元素将显示为块级元素，此元素前后会带有换行符
* inline 
    *  此元素会被显示为内联元素，元素前后没有换行符
* inline-block
    *  行内块元素
* list-item
    *  此元素会作为列表显示