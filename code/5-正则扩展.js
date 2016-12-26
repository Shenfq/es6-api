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
console.log('------------u修饰符----------');
//u修饰符：含义为Unicode模式，用来处理大于\uFFFF的Unicode字符
//'\uD83D\uDC2A'，这是一个四字节的字符
console.log( /\uD83D/.test('\uD83D\uDC2A') ); //true  这个字符被当作两个字符解析
console.log( /\uD83D/u.test('\uD83D\uDC2A') ); //false  使用u修饰符能正确匹配
//正则中 . 表示匹配任何单字符，但是对于码点大于0xFFFF的Unicode字符不能识别
var str = '𠮷';
console.log( /^.$/.test(str) ); //false
console.log( /^.$/u.test(str) ); //true  在u模式下能正确匹配
//es6新增了大括号表示的Unicode字符，但是正则本身也存在大括号表示的量词
//为了不冲突可以加上u修饰符
console.log( /\u{3}/.test('uuu') ); //true  不使用u修饰符，大括号中的数字被当做量词
console.log( /\u{30}/u.test('0') ); //true  使用u修饰符，正确匹配了码点为31的0字符

console.log('------------y修饰符----------');
//y修饰符，叫做粘连（sticky）修饰符
//作用与g修饰符类似，但是y修饰符要保证剩余匹配项的首部就能匹配，而g修饰符只要剩余匹配项存在即可
//y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

console.log( r1.exec(s) ); // ["aaa"]
console.log( r2.exec(s) ); // ["aaa"]

console.log( r1.exec(s) ); // ["aa"]
console.log( r2.exec(s) ); // null  剩余项：'_aa_a'  首位是_，不是a所有不能匹配

//简单说，就是y修饰符隐含了头部匹配的标志 ^
console.log(/b/y.exec('aba'));  // null

//sticky属性，表示是否设置了y修饰符
var reg = /a/y;
//这是一个只读属性
console.log(reg.sticky);  //true
