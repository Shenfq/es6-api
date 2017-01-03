//1、对象的属性简单表示法
var x = 1, y = 2;
var obj = {x, y};
console.log(obj);
//相当于：
/*
{
	'x': x,
	'y': y
}
*/

//除了属性能够简写，方法也能够简写：
var name = 'SFQ';
var man = {
	name,
	showName() {   //等同于：  'showName': function(){}
		console.log('名字：' + this.name);
	}
}
man.showName();

//属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
var cart = {
  _wheels: 2,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}
cart.wheels = 3;
console.log( cart.wheels );

//简写属性在申明时都是以字符串形式进行申明的
var method = {
	class () {  //这里使用class申明了一个函数但是不会报错
		return 0;
	}
}
//因为内部申明是以字符串形式申明的：  'class': function() {return 0;}


//属性名表达式：  es5只要在取数据的时候才能使用属性名表达式，现在在申明属性时也能使用属性名表达式了
var props = {
	'x': 1,
	'y': 2
}
console.log(props.x);
console.log(props['y']);

var props = {
	'a': 1,
	['a' + 'bc']: 2
}
console.log(props);

var lastprop = 'last prop';
var props = {
	'a': 1,
	[lastprop]: 2
}
console.log(props);
console.log('last prop : ' + props['last prop']);
//如果属性表达式传入的变量是一个非字符串，会先调用该变量的toString方法

var key = {a: 1};
var keys = {[key]: 0};
console.log(keys);  //{ [object Object]: 0 }


console.log('-------------Object.is------------');
//方法：  Object.is()  用来比较两个值是否完全相等
console.log( "Object.is('str','str') ==> "+Object.is('str','str') ); //true
console.log( "Object.is({}, {}) ==> "+Object.is({}, {}) ); //false

var myobj = {};
console.log( "Object.is(myobj, myobj) ==> "+Object.is(myobj, myobj) ); //true

//这样看好像该方法与 === 行为一致，但是有两个地方他们是有区别的

console.log( "NaN===NaN --> " + ( NaN===NaN ) ); //false
console.log( "Object.is(NaN, NaN) --> " + Object.is(NaN, NaN) ); //true


console.log( "+0===-0 --> " + ( +0===-0 ) ); //true
console.log( "Object.is(+0, -0) --> " + Object.is(+0, -0) ); //false


console.log('-------------Object.assign------------');
//该方法用于将多个或一个对象的可枚举属性复制的一个源对象上
//类似于jQuery中的 $.extend() 方法， 不过该方法只支持浅拷贝，没有extend方法那么强大
//同名的属性会覆盖源对象上的属性
var target = {
	a: {x:11,y:22},
	b: 2,
	c: 3
}
var source = {
	a:0,
	x:10,
	y:20
}
//第一个参数是目标对象，后面的参数都是源对象
console.log( Object.assign(target, source) );
/*{
	a:0,
	b:2,
	c:3,
	x:10,
	y:20
}*/

//获取对象描述：
//Object.getOwnPropertyDescriptor
var obj = {'foo':123};
console.log(Object.getOwnPropertyDescriptor(obj,'foo'));
/*Object:{
configurable:true,   表示该属性是否能被删除
enumerable:true,  表示对象是否可枚举，如果该值为false，表示某些操作会忽略该值
value:123,  当前属性的值
writable:true   表示属性是否可写
}*/

//属性遍历的5中方法：
/*
for-in   循环遍历对象自身的和继承的可枚举属性
Object.keys   返回一个数组，包括对象自身的所有可枚举属性
Object.getOwnPropertyNames   返回一个数组，包含对象自身的所有属性（包括不可枚举属性,不含Symbol属性）
Object.getOwnPropertySymbols   返回一个数组，包含对象自身的所有Symbol属性
Reflect.ownKeys   返回一个数组，包含对象自身的所有属性 (含Symbol属性)
*/


console.log('----------__proto__----------');
//getPrototypeOf、setPrototypeOf 
//着两个方法用来设置和获取对象的原型 (__proto__)

var obj = {
	name: 'Jack',
	age: 18,
	gender: 'man',
	_money: 5000
}
var proto = {
	showName() {
		console.log('名字是： '+this.name);
	},
	get money(){
		return this._money;
	},
	set money(value){
		if (value < 0) {
		  throw new Error('输入的数字有误！！！');
		}
		this._money = value;
	}
}
var obj = Object.setPrototypeOf(obj,proto);

obj.showName();
console.log(obj.money);

console.log( Object.getPrototypeOf(obj) );


//Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
//Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
