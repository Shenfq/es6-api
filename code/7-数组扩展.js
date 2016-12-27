//Array.from(),  将类数组对象和可遍历的对象转化为真正的数组
console.log('-----------Array.from()----------');
let arrayLike = {
	0: 2,
	1: 3,
	2: 5,
	length: 3
};

var arr1 = Array.from(arrayLike); //常见的类数组对象有NodeList和arguments
var arr2 = [].slice.call(arrayLike);   //es5可通过数组借调的方法实现

console.log(arr1);
console.log(arr2);

//同样也能把字符串和set结构转成数组，因为他们具有Iterator接口
console.log(Array.from('hello'));
//这功能与扩展运算符（...）类似，但是扩展运算符只能把具有iterator接口变量进行转换
console.log([...arrayLike]);

//Array.from() 支持传入第二个参数，作用类似map
//用来将每个元素进行处理，将处理后的值放入返回的数组
console.log(Array.from(arrayLike,x=>2*x));
console.log(Array.from(arrayLike).map(x=>2*x));

//写一个函数，用来返回各个参数的变量类型
function typesOf () {
  return Array.from(arguments, value => typeof value);
}
console.log( typesOf(null, [], NaN) ); //["object", "object", "number"]
//Array.from() 还可以传入第三个参数，用来指定第二个map函数的this
console.log(Array.from('hello',function(a){return a+this;},'0'));//["h0", "e0", "l0", "l0", "o0"]


console.log('-----------Array.of()----------');
//Array.of() 主要目的是弥补数组构造函数Array()的不足
//传统的Array()构造数组会根据传入参数的长度返回不同的值
console.log(Array()); //[]  不传入参数返回空数组
console.log(Array(1,2,3)); //[1,2,3] 传入一个以上的参数时，返回由参数组成的数组
console.log(Array(3));  //[ , , ]  传入一个参数时，返回的是参数指定长度的空数组

//Array.of() 的行为就很统一，返回的始终是参数组成的数组
console.log(Array.of()); //[]
console.log(Array.of(1,2,3)); //[1,2,3]
console.log(Array.of(3)); //[3]

//Array.of  在es5中也可以用数组的借调来实现
function ArrayOf(){
	return [].slice.call(arguments);
}


console.log('-----------数组的实例方法----------');
var arr = [1,2,3,4,5];
console.log('1、copyWithin()');
//copyWithin，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
/* 接受三个值
target(必须)： 从该位置开始替换数据
start： 从该位置读取数据，默认为0，如果是负数表示start+length
end： 到该位置停止，默认为length，如果是负数表示start+length
*/
console.log(arr.copyWithin(0,2,-2));

console.log('2、find()和findIndex()');
/*find() 用来找出第一个符合条件的数组成员，参数是一个回调函数
所有成员执行该回调，直到找出第一个返回值为true的成员并返回
没有符号条件的成员返回undefined
*/
console.log([1,3,-5,-8].find(n=>n<0));  //-5
//find的回调接受三个值，当前值、当前位置、原数组
console.log([4,6,8,15,8].find(function(value,index,arr) {
	console.log(value +'---' + index + '---' +arr);
	return value%5==0;  //15
}));
/*findIndex() 用来找出第一个符合条件的数组成员的位置，参数是一个回调函数
与find类似，只是该方法返回的是位置，传入的回调也一样
*/
console.log([1,3,5,-9].findIndex(n=>n<0)); //3
//两个方法都可以接受第二个参数，绑定回调的this指向
console.log([1,8,2,10].find(function(n){ return n>this; },5)); //8

console.log('3、entries、key、values');
//es6提供三个新方法遍历数组，他们都返回一个遍历器对象(Iterator)，可以使用for-of进行遍历
/*
keys() 对键名的遍历
values() 对键值的遍历
entries() 对键值对的遍历
*/
var arr = [9,8,7,6,5,4,3,2,1];
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

/* bug: babel不支持该遍历方式
for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}*/

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
//0 "a"
//1 "b"

//也可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

console.log('4、includes()');
//includes() 返回一个布尔值，判断数组中是否包含了该值，与字符串的includes类似
//该方法其实属于es7，但是babel已经支持

console.log([1,2,3].includes(2));  //true
console.log([1,2,3].includes(5));  //false

console.log('5、fill()');
//fill() 该方法用来填充一个数组
console.log([1,1,,2].fill(7));  //[7, 7, 7, 7]
//该方法还接受两个参数，表示填充的起始和结束位
console.log(['a',0,0,0,'b'].fill('x',1,-1));//["a", "x", "x", "x", "b"]


console.log('-----------数组空位----------');
//数组的空位就是指数组在该位置没有任何值
//比如Array构造函数指定长度返回的数组都是空位
console.log(Array(3)); //[ , , ]
//注意： 空位不是undefined，一个位置的值是undefined依然有值，空位是没有任何值得
//我们可以使用in运算符来看看
console.log(0 in [undefined, undefined]);  //true
console.log(0 in [ , ]);  //false

//es5中对空位的处理不是很一致，大多数情况都会忽略空位。
/*
forEach()、filter()、every()、some() 都会跳过空位
map()会跳过空位，但会保留这个值
join()、toString() 会把空位视为undefined，而undefined又会被处理成空字符串
*/

//es6中明确将空位转为undefined
console.log(Array.from(['a',,'b']));  //["a", undefined, "b"] 空位转成了undefined
console.log([,'a','b',,].copyWithin(2,0) );// [,"a",,"a"]  会把空位也拷贝

//各种方法对空位处理不同，应尽量避免数组的空位