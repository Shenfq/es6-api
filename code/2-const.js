//1、什么是const变量？ 使用const声明的变量是一个常量，一旦声明将不可被改变
{
	const PI = 3.1415;
	console.log(PI);
	//const PI = 3.1; // Duplicate declaration "PI"(…)
	//PI = 0; //"PI" is read-only(…)
}
//const与let类似，只在当前块级作用域有效，存在暂时性死区，不能重复声明
//console.log(PI); //ReferenceError: PI is not defined(…)

//2、const声明后就必须赋值，要不然也会报错

{
	//const three;  //Unexpected token
	const three = 3;
}


//3、对于引用类型的变量，const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变
{
	const obj = {};
	obj.name = 'FirstProp';
	console.log(obj);//我们可以为该对象添加新的属性，但是不能改变变量指向的对象
	//obj = new Object();  //"obj" is read-only(…)


	//-------------

	//对于数组也同样，我们可以向数组常量添加元素，但是不能改变常量指向其他数组
	const arr = [];
	arr.length = 2;
	arr.push('NewItem');
	console.log(arr);
	//arr = ['NewArr']; //"arr" is read-only(…)
}

//如果想让声明的对象不能扩展新的属性，可以使用Object下面的freeze方法，将对象冻结
{
	const foo = Object.freeze({});
	//foo.prop = 123; //Can't add property prop, object is not extensible(…)
	console.log(foo);
}
//我们不经要将对象冻结，还要将它的属性一并冻结，下面的方法用来冻结一个对象：
function FreezeObj(obj){
	Object.freeze(obj);
	Object.keys(obj).forEach(function(key){
		if(typeof obj[key] === 'object') FreezeObj(obj[key]);
	});
}
{
	const newObj = {
		FirstProp: {
			a:1,
			b:{
				x:0
			}
		},
		SecondProp:{
			one: 'this is a string',
			two: {
				q: 'aaa',
				p: 'bbb'
			}
		}
	};
	FreezeObj(newObj); //这样做之后，该对象既不能改变指向也不能修改属性了。
	console.log(newObj);

	//newObj.a = 0; // Can't add property a, object is not extensible(…)
	//newObj.FirstProp.b = 0; // Cannot assign to read only property 'b' of object '#<Object>'(…)
	//newObj.SecondProp.two.q = 0; // Cannot assign to read only property 'q' of object '#<Object>'(…)
}
