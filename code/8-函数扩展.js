//支持为函数的参数指定默认值
function add(x = 5, y = 1) {
	return x + y;
}
console.log( add() );  //6
//使用函数默认值得时候，默认对参数变量进行了声明，所有不能在函数体中对参数变量再次声明
//function fun (x=0){ let x=1; } //Duplicate declaration "x"

//定义默认值得参数最好是函数的尾参数，因为这样比较容易看出来

function f(x=1,y){
	return [x,y];
}
//如果要调用该参数的默认值又不能省略只能传入undefined
console.log( f(undefined,0) ); //[1, 0]
//传入null不能触发默认值
console.log( f(null,0) );  //[null, 0]


//函数的length属性，用来返回没有指定默认值得参数个数
var fun1 = function(a,b,c=1) {};
console.log(fun1.length); //2
//length的含义是指该函数预期传入的参数个数，指定默认值得参数不再被包括在这个预期参数里

//如果设置默认值的的参数不是函数的尾参数，那么length不再计入后面的参数
var fun2 = function(a=1,b,c) {};
console.log(fun2.length);//0  这里babel的编译返回的是3，应该是一个bug

//函数参数的作用域与其他变量作用域规则一样
//先是当前函数的作用域，然后才是全局作用域
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2

//如果调用时，函数作用域内部的变量x没有生成，结果就会不一样。
function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // 1

//函数参数默认值的应用：可以指定某个参数不能被省略
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
//foo();  //Uncaught Error: Missing parameter(…)


console.log('-----------rest参数----------')
//rest参数（形式为“...变量名”）
//用来将多个参数转成一个数组，并且rest参数是函数参数的最后一个参数
function add(...values) {
	let sum = 0;
	for(let val of values) {
		sum += val;
	}
	return sum;
}
console.log( add(2,5,3) );
//函数的length属性除了不包括有默认值的参数，也不包括rest参数
console.log((function(a,...b){}).length);//1

//rest参数是一个数组，所有可以直接调用数组的方法
function add2(...values) {
	let sum = 0;
	values.forEach(function(val) {
		sum += val;
		console.log(val);
	});
	return sum;
}
console.log(add2(5,5,5));

console.log('-----------扩展运算符----------')
//扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。
console.log(...[1,1,2,2,3]);
//扩展运算符和函数参数结合使用，非常灵活
function f(a,b,c,d) {console.log(a,b,c,d)}
var args = [1,2,3,4]
f(...args);
//求一个数组的最大元素
var arr = [55,3,2,99,23];
console.log( Math.max(...arr) );

//合并两个数组
var newarr = ['a','b'];

console.log( [1,2].concat(newarr) );//es5
console.log( [1,2,...newarr] );//es6

//将字符串转为数组
console.log([...'hello']);

//将一个类数组对象转化为真正的数组
var arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

var arr = [...arrayLike];
console.log(arr);


//函数name属性，返回该函数的函数名
//不过是真正的函数还是函数表达式都能返回函数名
function foo(){}
console.log(foo.name);

var fun = function () {};
console.log(fun.name)

//Function构造函数返回的函数实例，name属性的值为“anonymous”。
console.log( (new Function).name );
//bind返回的函数，name属性会加上bound前缀
function foo() {}
console.log( foo.bind(window).name ); //bound foo


console.log('---------箭头函数---------');
//es6新增了箭头函数的表示方式，表达方式更加简洁
// 函数参数 => 函数返回值
var square = v => v*v;
console.log( square(5) ); //25

//如果有多个函数参数，使用圆括号表示参数
//如果代码块不止一行，使用大括号括起来并使用return返回

var sum = (v1,v2) => { 
	let sum = v1+v2; 
	return sum;
};
console.log(sum(3,4)); //7

//如果返回值是一个对象，则对象外面必须加上括号
var toObj = (name,age) => ({name:name,age:age});
console.log( toObj('Jack',18) );

//箭头函数的注意事项
//this的指向，是定义时所在的对象，而不是使用时所在的对象。
var arrowfun = function() {
	console.log(this);
	()=>{console.log(this)}();
}
arrowfun.call({Prop:0});//当前的this就是call传入的对象

var name = 'window'
var man = {
	name:'sfq',
	age:20,
	sayName: function() {
		return (()=>this.name)();
	},
	sayName2: ()=>this
}
console.log( man.sayName() ); //sfq
//console.log( man.sayName2() ); //window   这里使用babel有个问题，babel默认所有匿名函数的this都是undefined

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);

//箭头函数的this就是引用外层作用域的this，所有箭头函数没有自己的this，不能做构造函数使用


//函数的绑定
//es7新增了函数绑定运算符(::)，用来取代call、apply、bind
//双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

/*var obj = {name: 'obj'};
function showname(){
	console.log(this.name);
}*/
//obj::showname();  目前不支持该语法