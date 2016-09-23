# TimeDown
倒计时插件
##引用
`<script type="text/javascript" src="./timedown.js"></script>`
##参数
- default target is after on hour;
```
var target = {
  year:2016,
  month:9,
  day:23,
  hour:19,
  minute:59,
  second:59
};
window.onload = function(){
  var timedown = new TimeDown('day','hour','minute','second',target);
  timedown.init();
  timedown.start();
}
```
