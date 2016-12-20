//1、let声明的变量只在所在的代码块有用。这为js引入了块级作用域的概念
let a = 1;
{
	let a = 2;
	console.log('内部：' + a);  //2
}
console.log('外部：' + a);  //1

//-------------------------
let arr1 = [], arr2 = [];
for(let i = 0; i<5; i++){
	arr1[i] = function() {
		console.log(i);
	}
}
for(var j = 0; j<5; j++){
	arr2[j] = function() {
		console.log(j);
	}
}
//console.log(i);    //ReferenceError: i is not defined(…), 因为定义的i只在for循环的作用域内有用，在外部使用会产生错误。
arr1[3](); //3.   使用let声明的i变量。每次循环i都再当前循环体内声明一个i变量，并保存
//console.log(j);//5
arr2[3](); //5.   使用var声明的j变量，每次循环都会将前面j进行覆盖，并且会暴露成全局的变量


//2、不存在变量提升，且存在暂时性死区（temporal dead zone，简称TDZ）

//先看看变量提升

{
	console.log(temp1); //输出："undefined"
	console.log(temp2); //报错：ReferenceError: temp2 is not defined(…)
	//这里我的browser可能有些功能还没实现，就是两次都会显示undefined，并不会报错
	//还是推荐大家使用服务器版本的babel，现在浏览器版本的browser也已经停止更新了
	var temp1 = 1;
	let temp2 = 2;
}

//暂时性死区

if (true) {
	//只要在let声明变量之前使用了该变量，这一块区域都称为暂时性死区
	// TDZ开始
	tmp = 'abc'; // ReferenceError
	console.log(tmp); // ReferenceError
	// TDZ结束
	let tmp; 
	console.log(tmp); // "undefined"
	tmp = 123;
	console.log(tmp); // 123
}

{
	console.log( typeof aaa ); //"undefined"
	//以前就算没声明x变量，直接使用也会显示出undefined，但是在暂时性死区中不被允许。
	console.log( typeof x ); // ReferenceError
	let x;
}

//3、不要允许重复声明变量
{
	let a = 1;
	//let a = 2;//Identifier 'a' has already been declared
}