//1、什么是const变量？ 使用const声明的变量是一个常量，一旦声明将不可被改变
{
	const PI = 3.1415;
	console.log(PI);
	//const PI = 3.1; // Duplicate declaration "PI"(…)
	//PI = 0; //"PI" is read-only(…)
}
//const与let类似，只在当前块级作用域有效，存在暂时性死区，不能重复声明
//console.log(PI); //ReferenceError: PI is not defined(…)

