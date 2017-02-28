//Iterator是一种接口，专门为各种不同的数据结构提供统一的访问机制。
//任何数据结构只要部署了Iterator接口，就可以完成遍历操作。
//es6创造的新的遍历方式：for-of，就是使用遍历器接口进行循环
//Iterator遍历的过程
/*
1、创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上是一个指针对象
2、第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
3、第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
4、不断调用指针对象的next方法，直到它指向数据结构的结束位置。
*/

let arr = [1,2,3];

console.log( arr[Symbol.iterator] );  //该接口部署了遍历器接口
//数组原生就具有Iterator接口，不用做任何处理就能使用for-of进行遍历

let counter = 0;
const obj = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				counter++;
				return counter <= 5 ?
					{
						value: counter,
						done: false
					}
					:
					{
						value: undefined,
						done: true
					}
			}
		}
	}
}
/*
next方法返回一个对象，表示当前数据成员的信息。
该对象具有两个属性： value、done。
value： 返回当前位置的成员
done[boolean]：表示遍历是否结束，true时表示遍历已经结束
*/
for(let val of obj) { //for-of 循环每次返回的是next返回对象的value属性
	console.log(val);
}


//手动调用遍历器接口。
let iter = arr[Symbol.iterator]();

console.log(iter.next()); //{value: 1, done: false}
console.log(iter.next()); //{value: 2, done: false}
console.log(iter.next()); //{value: 3, done: false}
console.log(iter.next()); //{value: undefined, done: true}


//对于类数组对象可以直接调用数组的遍历器

let likeArr = {
	0: 'a',
	1: 'b',
	2: 'c',
	length: 3,
	[Symbol.iterator]: Array.prototype[Symbol.iterator]
};

for( let item of likeArr ) {
	console.log(item);
}


//解构赋值，扩展运算符都调用的是iterator接口