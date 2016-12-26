console.log('---------新增进制表示法---------');
//新增二进制和八进制的新写法
/*
二进制：0b或0B
八进制：0o或0O
*/
console.log( 0b1011 ); //11
console.log( 0o15 );   //13

//如果要将0b和0o前缀的字符串转为十进制，要使用Number方法
var s = '0b1011'
console.log( parseInt(s) );//使用parseInt会返回0，碰到b之后就会停止解析
console.log( Number(s) );//11  只要用Number才能正确解析这种写法

console.log('---------Number扩展的方法---------');
//es6将下列几个全局对象上的方法移植到了Number对象上
//isFinite、isNaN、parseInt、parseFloat
//这样做的目的是为了减少全局性方法，使语言逐步模块化

console.log( Number.isFinite(15) );//true
console.log( Number.isFinite(Infinity) ); //false

console.log( Number.isNaN(15) ); //false
console.log( Number.isNaN(NaN) ); //true

//这两个方法与全局对象下的区别在于，全局对象下的方法会先调用Number将非数字转为数值，在判断。
//Number下的这两个方法只对数值有效，非数值一律返回false
console.log(isFinite('25'));//true
console.log(Number.isFinite('25'));//false
console.log(isNaN('NaN'));//true
console.log(Number.isNaN('NaN'));//false

//再看看parseInt和parseFloat
console.log( Number.parseInt('12.34') );  // 12
console.log( Number.parseFloat('123.45#') );  // 123.45

console.log(Number.parseInt === parseInt); //true
console.log(Number.parseFloat === parseFloat); //true


console.log('---------isInteger方法---------');
//Number.isInteger用来判断是否是一个整数
console.log(Number.isInteger(25));//true
console.log(Number.isInteger(25.0));//true  在js中，整数和浮点数是同样的存储方式，25和25.0是同一个值
console.log(Number.isInteger(25.1));//false


console.log('---------新增极小常量---------');
console.log(Number.EPSILON);//2.220446049250313e-16
console.log(Number.EPSILON.toFixed(20));//0.00000000000000022204
//引入这个变量的目的是为了给浮点计算设置一个误差，让我们知道浮点数计算是不精确的
console.log(0.1+0.2);  //0.30000000000000004
console.log( (0.1 + 0.2 - 0.3).toFixed(20) );  //0.00000000000000005551

//如果这个误差能够小于Number.EPSILON，我们就可以认为得到了正确结果。
//因此，Number.EPSILON的实质是一个可以接受的误差范围。
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}
//这是一个误差检查函数
withinErrorMargin(0.1 + 0.2, 0.3)// true
withinErrorMargin(0.2 + 0.2, 0.3)// false

console.log('---------安全整数---------');
//js能够准确表示-2^53到x^53之间的整数，超过这个范围遍不精确

console.log(Math.pow(2, 53) === Math.pow(2, 53)+1); //true

//es6引入了两个常量，Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
//用来表示js能精确的整数的范围
//Number.isSafeInteger()  用来判断一个整数是否落在这个范围内,且只能判断整数
console.log( Number.isSafeInteger(Infinity) );//false
console.log( Number.isSafeInteger(NaN) );//false

console.log( Number.isSafeInteger(5) );//true
console.log( Number.isSafeInteger(5.5) );//false

console.log( Number.isSafeInteger(Number.MAX_SAFE_INTEGER) );//true
console.log( Number.isSafeInteger(Number.MAX_SAFE_INTEGER+1) );//false

console.log( Number.isSafeInteger(Number.MIN_SAFE_INTEGER) );//true
console.log( Number.isSafeInteger(Number.MIN_SAFE_INTEGER-1) );//false

console.log('---------Math对象的扩展---------');

console.log(Math.trunc(4.5));//4  去除小数部分返回整数，对于空和无法取整的值返回NaN
console.log(Math.trunc(true));//1
console.log(Math.trunc('str'));//NaN

console.log(Math.sign(-5));//-1   用来判断一个数的正负
console.log(Math.sign(5));//1
console.log(Math.sign(0));//0

console.log(Math.cbrt(8));//2  计算一个数的立方根


console.log( Math.hypot(3,4) );//5  返回所有参数的平方和的平方根。

//es6还新增了许多对数和指数的运算函数，不一一列举了

//ES7新增了一个指数运算符（**)
let a = 3;
a **= 3;
console.log(a);//27

let b = 2;
console.log( b**5 );//32