//es5中RegExp的构造函数只能接受字符串作为参数，现在可以使用正则表达式做参数
//返回一个原有正则的拷贝
var reg1 = new RegExp('\\w+','g');
var reg2 = /\w+/g ;
console.log(reg1);
console.log(reg2);

var reg = new RegExp(/\w+/ig,'g');
//如果传入了构造函数的第二个参数，会忽略原来的正则的修饰符只使用新的
console.log(reg); //　/\w+/g

//在字符串对象下有四个方法可以使用正则：
//mathc  replace  search  split。
//es6将这四个方法在内部全部调用RegExp的实力方法，从而使得正则相关方法全部都在RegExp对象上


//es6 为正则新增了flags属性，会返回正则的修饰符
var reg = /\w+/ig;
console.log(reg.source);  //\w+  这是es5的属性，返回正则的本体
console.log(reg.flags);  //ig 


//新增修饰符  u、y
//u修饰符：含义为Unicode模式，用来处理大于\uFFFF的Unicode字符
//'\uD83D\uDC2A'，这是一个四字节的字符
console.log( /\uD83D/.test('\uD83D\uDC2A') ); //true  这个字符被当作两个字符解析
console.log( /\uD83D/u.test('\uD83D\uDC2A') ); //false  使用u修饰符能正确匹配