//es6中不仅新增了基本数据类型Symbol，还新增来两种新的数据结构Set和Map
//与构造数组和对象一样，这两种数据结构都有自己的构造函数，通过new的方式创建实例
var s = new Set(),
	m = new Map();
console.log(s);  //Set{}
console.log(m);  //Map{}


//先看看Set结构，它类似于数组，但是所有成员的值都是唯一的，没有重复的值
var set = new Set();
[2,3,2,2,4,5,4,6,6].map(x=>set.add(x));
console.log(set); // Set{2, 3, 4, 5, 6}  相同的值是不会add到Set中的

//创建Set结构时，支持传入一个数组作为参数，来初始化
var set = new Set([1,2,2,3,3,4]);
console.log(set);  //Set{1,2,3,4}
console.log(set.size)  //4  使用size属性来获取set的长度
console.log( [...set] ); //[1, 2, 3, 4]  通过运算符 ... 就能把set结构转为数组

//[...new Set(arr)];  我们可以通过该方法进行数组的去重

//Set结构的四个操作方法： add  delete  has  clear
