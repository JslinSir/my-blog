# 中骏小程序 前端复盘



### bugs
* 接口名复制的yapi多了空格，部分机型出现接口404问题<br>
  解决： 去掉空格，或在request 方法中清除接口名的空格

* Android 左上角，出现完成字样 ios 直接弹出键盘<br>
  如果一个组件中 有 textarea 或者input 这个时候控制组件显示的是外层view 则会出现此现象<br>
  解决： textarea 或者input 加上控制是否显示开关<br>