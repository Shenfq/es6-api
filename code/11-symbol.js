//symbol是es6新增的一种原始数据类型，使用Symbol()方法生成

//该数据类型的主要作用是保证一个对象的属性名不冲突。
//在传统js中，对象的属性名都是字符串，很容易造成属性名的冲突。
//比如，你使用一个他人提供的对象，你想为该对象添加新的方法，但是新方法名可能与现有属性冲突。
//这时候你可以使用symbol变量来表示属性名，来表示该属性独一无二

var x = Symbol();  //注意：使用该函数时不能在前面使用new关键字，否则会报错
console.log(typeof x);  //symbol

//创建symbol时，可以传入一个字符串参数，表示该symbol实例的描述，用来区分不同的symbol
console.log( Symbol('one') ); //Symbol(one)
console.log( Symbol('two') ); //Symbol(two)

//如果什么都不传，打印出来的结果一样（都是 Symbol() ），就没有办法分别两个不同的变量
//Symbol() 的参数只是用来描述该变量的，并不是指定它的值，所以任意的Symbol都是不相等的

console.log( Symbol() === Symbol() ); //false
console.log( Symbol('new') === Symbol('new') ); //false

//使用一个Symbol变量做对象的属性：

var symbol = Symbol('hello'),
	obj = {};
obj[symbol] = 'Hello';

console.log(obj); //object{ Symbol(hello): "Hello" }  该对象的该属性是唯一的，不会被覆盖

//如果我们再传入一个Symbol属性，也不会把前面的覆盖
var symbol2 = Symbol('hello2');
obj[symbol2] = 'Hello2';
console.log(obj); //object{ Symbol(hello): "Hello",Symbol(hello2): "Hello2" } 

//调用symbol属性时，不能使用 . 操作符
//. 操作符默认会把属性名转化为字符串
obj['prop'] = 0;
console.log(obj.prop === obj['prop']);  //true
console.log(obj.symbol);  //undefined


//Symbol属性不会再for-in和for-of循环中出现，也不会被Object.keys()、Object.getOwnPropertyName()返回
//Object.getOwnPropertySymbols方法，专门用来获取一个对象的Symbol属性

console.log( Object.getOwnPropertySymbols(obj) ); // [ Symbol(hello), Symbol(hello2) ]


//Symbol对象下的两个方法：  Symbol.for() 和 Symbol.keyFor()
//Symbol.for(str) 该方法也是用来生成一个Symbol实例，只是生成之前会搜索有没有以传入的字符串为名字的Symbol，有则直接返回，没有则创建

var s1 = Symbol.for('TheOne'),
	s2 = Symbol.for('TheOne');
console.log(s1===s2); // true

//Symbol.keyFor(symbol)  该方法用来返回一个Symbol的描述
console.log( Symbol.keyFor(s1) );  //TheOne


//内置的Symbol值

//1、Symbol.hasInstace   调用instanceof运算符的时候就会调用此方法

var obj = function(name) {
	this.name = name;
}
obj.prototype = {
	[Symbol.hasInstance](foo) {
		console.log(foo);
		return foo instanceof Array;
	}
}
var objstance = new obj();
console.log(objstance);
console.log( [1,2,3] instanceof objstance );

//2、Symbol.isConcatSpreadable  设置此属性（布尔值），表示该对象在concat时，是否能展开

var arr = [5,6]
arr[Symbol.isConcatSpreadable] = false;
console.log( [1,2].concat(arr,0) );  //[1, 2, [5, 6], 0]


//3、Symbol.match
/*
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
*/



