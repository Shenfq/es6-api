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
console.log(set);  //Set{1, 2, 3, 4}
console.log(set.size)  //4  使用size属性来获取set的长度
console.log( [...set] ); //[1, 2, 3, 4]  通过运算符 ... 就能把set结构转为数组

//[...new Set(arr)];  我们可以通过该方法进行数组的去重

//Set结构的四个操作方法： add  delete  has  clear
var set = new Set([1, 2, 3]);

set.add(4);
console.log(set); //Set{1, 2, 3, 4}

set.delete(2);
console.log(set);  //Set{1, 3, 4}

console.log( set.has(1) ); //true

set.clear();
console.log(set);  //Set{ }

//Set 的遍历操作
/*
keys()
values()
entries()
forEach()
*/
var set = new Set(['a', 'b', 'c', 'd']);
//由于Set结构没有键名，所以keys和values返回的结果一致，也就是所Set的键名和键值是同一个值
console.log(set.keys());  //SetIterator {"a", "b", "c", "d"}
console.log(set.values());  //SetIterator {"a", "b", "c", "d"}
console.log(set.entries()); //SetIterator {["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"]}

set.forEach(val=>console.log('forEach->' + val));


//WeakSet结构与Set结构类似，只是WeakSet结构的成员只能是对象
//而且WeakSet中的对象都是弱引用，当其他变量都不引用该对象时，这个对象会自动回收，不考虑该对象是否还存在于WeakSet中
//这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的

var ws = new WeakSet();

//ws.add(1);  //Invalid value used in weak set  因为添加的成员是一个数值，而非一个对象，所以会报错

//WeakSet有三个方法 add delete has
var obj = {'name': 'Object'};
ws.add(window);
ws.add(obj);
console.log(ws.has(window)); //true
ws.delete(window);
obj = null;

setTimeout( function() {console.log(ws)}, 1000);  //1s 之后在控制台打印这个WeakSet会发现obj已经被销毁了
//WeakSet的一个用处就是存储DOM节点，而不用担心这些节点从文档中移除时，会引发内存泄漏


//Map结构，类似于对象，也是键值对的集合，但是不同于对象。因为Map结构的‘键’的范围不限于字符串，各种类型的变量都能当做一个键

//创建Map结构时，构造方法接受一个数组作为参数，该数组的成员是一个个表示键值对的数组
var map = new Map([
	['name','张三'],
	['age',20]
]);

console.log(map);// Map {"name" => "张三", "age" => 20}

//get 与 set 方法，用来设置和获取Map的值

var a1 = [1], a2 = [1];
map.set(a1,1).set(a2,2);  //set方法支持链式调用
console.log(map.get(a1));  //1
console.log(map.size);  //4
console.log(map.has(a2));  //true

map.delete(a1);
map.delete(a2);
console.log(map); // Map {"name" => "张三", "age" => 20}
map.clear(); //清空Map
console.log(map); //Map {}

//Map结构同样支持四种方式进行遍历
/*
keys()
values()
entries()
forEach()
*/
var map = new Map([
	['name','张三'],
	['age',20],
	[a1,'a1'],
	[a2,'a2']
]);
console.log(map.keys()); //MapIterator {"name", "age", [1], [1]}
console.log(map.values()); //MapIterator {"张三", 20, "a1", "a2"}
console.log(map.entries()); //MapIterator {["name", "张三"], ["age", 20], [Array[1], "a1"], [Array[1], "a2"]}

//WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。
//WeakMap结构有助于防止内存泄漏。