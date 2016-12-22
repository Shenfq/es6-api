//1、基本用法
//当我们定义了一个数组，又想给数组中的每个元素一个变量名，我们可以用解构赋值
var arr = [1,2,3];

{
	let [a,b,c] = arr;
	console.log('%d\n%d\n%d',a,b,c);  //1--2--3，我们可以看到a b c，分别代表了数组中的第一二三个元素
	/*es5写法:
	var a = arr[0];
	var b = arr[1];
	var c = arr[2];
	*/
}
//2、解构赋值等号两边应一一对应，不对应的值会等于undefined
console.log('-----------------------');
{
	let [a,,b] = arr;
	console.log('%d\n%d',a,b);   //1--3

	let [x,...y] = arr;  //...表示将一个数组或者类数组对象展开，或者将许多逗号隔开的值合并成一个数组
	console.log(x); //1
	console.log(y); //[2,3]

	//解构不成功，变量的值为undefined
	let [q] = [];
	let [c,k] = [1];
	console.log(q); //undefined
	console.log(k); //undefined
	//以上两种情况都表示解构不成功


	//如果左边的变量只能匹配右边数组的一部分值，这种情况也是能解构成功的
	let [f,g,h] = [1,2,3,4,5];
	console.log('%d\n%d\n%d',f,g,h); //1 2 3  这种情况称为不完全解构
}

//3、解构赋值可以指定默认值
console.log('-----------------------');
{
	let [bool=true] = [];
	console.log(bool); //true

	//只有当解构的变量===undefined时才会启用默认值，如果该变量解构值为false、null都是不会为默认值的
	var [x = 1] = [undefined];  console.log(x);  //1
	var [x = 1] = [false];  console.log(x);  //false
	var [x = 1] = [null];  console.log(x);  //null

	//默认值也可以引用解构赋值的其他变量，但是该变量必须先声明
	let [a = 1, b = a] = [2];
	console.log('%d\n%d',a,b);  //2 2
	let [q = p, p = 1] = [];     // ReferenceError:p is not defined(…)
	//这里q用到的默认值是p，而p在这时还没有声明，所有会有错误。
	//在q使用p的这块区域就是之前所说的暂时性死区，比较隐秘


	//解构赋值的默认值还能是一个函数表达式
	let fun = function() {
		console.log('execute');
		return 'this function has executed';
	}
	let [foo = fun()] = [];
	console.log(foo); //'this function has executed'//当解构失败时，执行函数，并获得返回的值
}

//4、对象的解构赋值，之前都是数组的解构赋值，现在看看对象的解构赋值
console.log('-----------------------');
var obj = {
	first: 1,
	second: 2,
	thrid: 3
}
{
	let {first,thrid} = obj;
	console.log('%d\n%d',first,thrid);  //1  3
	//对象的解构与数组解构最大的不同就是，数组解构是按照元素排列的次序进行的，
	//而对象属性没有次序，变量名必须和属性名相同，这样才能够取得值。

	//上面的方法其实是一种简写，对象解构的完整写法是这样的：
	//let {first:first, thrid:thrid} = obj;


	//对象的解构是先找到同名的属性，然后把值付给后面的变量，
	//所有真正的赋值者是后面的变量，而不是前面的属性名
	let {first:f,thrid:t} = obj;
	console.log('%d\n%d',f,t);  //1  3


	//对象的解构赋值也能使用默认值
	var {x=3} = {};
	console.log(x); //3
	var {x:y=3} = {};
	console.log(y); //3
	var {x:y=3} = {x:5};
	console.log(y); //3
}

//5.不可重复声明
console.log('-----------------------');
{
	//解构赋值的声明与赋值是一体的，对于let和const来说，声明过的值不能再进行解构赋值
	let first;
	//let {first} = obj; //Duplicate declaration "first"
	var {first} = obj;  //使用var不存在这个问题
	console.log(first);


	//解构时如果只进行赋值，而不进行再次声明是不会产生错误的。
	let foo;
	( {foo} = {foo: 1} ); // 成功
	console.log(foo);  //1

	//上面解构赋值时的括号是必须的，因为解析器会把行首的大括号当成是代码块，而不是赋值语句
}

//6、其他类型变量的解构赋值
console.log('-----------------------');
//除了数组和对象，字符串、数字和布尔值也能进行解构，它们会先转化为对象。
//undefined和null无法转为对象，所以无法进行解构赋值
{
	let [a,b,c,d,e] = 'hello';
	console.log('%s\n%s\n%s\n%s\n%s',a,b,c,d,e);

	let {toString: numString} = 111;
	console.log(numString);

	let {toString: boolString} = true;
	console.log(boolString);

	//let {toString} = undefined;  //报错
}

//7、使用变量解构赋值的具体用法
console.log('-----------------------');
{
	//1-交换变量的值
	var x=1,y=3;
	[x,y] = [y,x];
	console.log('%d\n%d',x,y);
	//2-函数传参
	function f([x, y, z]) { console.log(z); }
	f([1, 2, 3]);

	//3-为函数参数设置默认值
	function add({
		first = 1,
		second = 2
	}){
		console.log(first+second);
	}
	add({first:5});  //5+2

	//4-为输入模块或者内部模块指定方法
	//const { SourceMapConsumer, SourceNode } = require("source");
	//这样就可以直接使用SourceNode方法，而不需要在这样写：
	//source.SourceNode();

	//如果上面难理解的话，我们可以看看简单点的调用内部对象
	const {random,floor,ceil,max,min,PI} = Math;
	console.log(PI);
	console.log(random());
}