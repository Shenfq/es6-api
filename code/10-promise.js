//Promise 是一个js编程的解决方案
//之前有很多库实现了这个规范，比如jQuery的Deferred对象
//现在es6将这个方案写入了语言标准，统一了用法，原生直接提供Promise对象

//Promise的主要特点：
/*
1、Promise是一个对象，通过new进行实例化，各种异步操作都是在返回的实例对象上进行的
2、Promise的状态不受外部影响，一共有三种状态：
	pending 进行中
	resolved 已完成
	rejected 已失败
	Promise实例对象刚创建时都是pending状态，只能由pending状态转为resolved或者rejected状态
	且状态转变后就不能再进行转变。
*/

//1  创建一个promise实例
//实例创建时接受一个函数，该函数接受两个参数
//resolve： 将promise对象转为成功态
//reject：  将promise对象转为失败态
var promise = new Promise(function(resolve, reject) {
	console.log('create promise');
	if(true) {
		resolve('done');
	}else{
		reject('error')
	}
});
promise.then(function(val){
	console.log(val);
}).catch(function(err){
	console.log(err);
});
console.log('promise then done');
/*执行的先后顺序：
create promise
promise then done
done  回调函数是在js脚本同步代码完毕后才能执行回调
*/

//2  promise实例的then方法
//then方法定义在Promise的prototype上
//接受两个参数：
/*
	第一个参数是Resolved状态的回调函数，在状态转为成功态时调用
	第二个参数是Rejected状态的回调函数，在状态转为失败态时调用
*/
//resolve和reject函数传递的参数都被他们的回调函数所接受。
var def1 = new Promise(function(res, rej) {
	rej('you have error');
});
def1.then(val=>val,(err)=>{
	console.error(err);
});

//resolve和reject函数接受的参数如果是一个promise实例，那么当前实例会等待之前的实例发生改变在进行操作
//下面案例中，p1和p2都是promise实例，但是p2的resolve方法将p1作为参数，所以p1的状态决定了p2的状态
//只有当p1的状态为完成态或失败态时，p2的回调才会被调用
var p1 = new Promise(function (resolve, reject) {
  // ...
});

var p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
});

//下面代码中p2状态在.1秒后变为成功态，但是传入的p1还在进行态
//.3秒后p1状态转变，p2的回调是根据p1状态来执行的
var p1 = new Promise(function (resolve, reject) {
	setTimeout(() => reject(new Error('fail')), 300);
	//setTimeout(() => resolve('p1 has done'), 3000);
});
var p2 = new Promise(function (resolve, reject) {
	setTimeout(() => resolve(p1), 100);
});
p2.then(
	resolve=>console.info('resolve:'+resolve),
	reject=>console.error('reject:'+reject)
);

//then方法每次返回的都是一个新的Promise实例（不是原来的那个），因此可以采用链式写法。
//在then方法后面调用另一个then方法，且后面调用的then方法接受的参数是之前then方法的返回值
var def2 = new Promise(function(res, rej) {
	res(0);
});
def2.then(function(count) {
	console.log('count:'+ count);
	return ++count;
}).then(function(count) {
	console.log('count:'+ count);
	return ++count;
}).then(function(count) {
	console.log('count:'+ count);
});

//如果then返回的是一个Promise对象，会在状态转变后再调用其回调
function timeout(ms,value,fail) {
	return new Promise((resolve, reject)=>{
		if(!fail){
			setTimeout(resolve,ms,value);
		}else{
			setTimeout(reject,ms,value);
		}
	});
}

timeout(500,'first').then((value)=>{
	console.log(value);
	return timeout(500,'second');
}).then((value)=>{
	console.log(value);
});


//3  Promise实例方法： catch
//该方法其实是 .then(null, callback) 的一个别名，用来指定发生错误时的回调函数
timeout(2000,'error',true).then((val)=>{
	//....
}).catch(err=>console.error('发生错误！',err));


// var someAsyncThing = function() {
//   return new Promise(function(resolve, reject) {
//     // 下面一行会报错，因为x没有声明
//     resolve(x + 2);
//   });
// };

// someAsyncThing().then(function() {
//   console.log('everything is great');
// }).catch(function(err) {
// 	console.error(err);
// });


// Promise.all 方法
//用于将多个Promise实例，包装成一个新的Promise实例

//var p = Promise.all([p1,p2,p3]);
//Promise.all方法接受一个数组作为参数，数组中的元素都是Promise对象实例。
//p的状态由 p1 p2 p3 来决定：
/*
	1、只有三个实例全部是resolved状态时，p的状态才会变为完成态，且p回调的参数为三个参数返回值组成的数组
	2、只要有一个实例被rejected，那么p的状态就变成了rejected，此时第一个被reject的实例的返回传递给p的回调

*/

var promises = [1,2,3].map(function(num){
	return timeout(num*1000, 'num:'+num);
});
Promise.all(promises)
.then(props=>console.log(props))   //只有当promises全部成功后才会调用该回调
.catch(error=>console.error(error));
//这个方法就是jQuery中Deferred对象的when方法


// Promise.race 方法

//var p = Promise.race([p1, p2, p3]);

//该方法和all接受的参数一样，也是将多个Promise实例包装成一个新的Promise实例
//只要传入多个实例中有一个实例改变了状态，那么p的状态就改变，并将返回值传给p的回调

var p = Promise.race([
	fetch('http:localhost/url/getJson.php'),
	new Promise(function(resolve,reject) {
		setTimeout(()=>{
			reject(new Error('Request Timeout'));
		},5E3);
	})
]);
p.then(response => console.log(response))
 .catch(error => console.log(error));
//上面代码的作用就是5秒内fetch没有返回结果，那么就将Promise转为rejected状态，抛出错误


//Promise还有两个方法： resolve和reject
//都是将一个现有对象转换为一个Promise对象

//Promise.resolve(arg)  对参数的处理一共有四种方式：

//1、参数是一个Promise实例，那么该方法将不做任何修改，原封不动的返回这个实例

//2、参数是一个thenable对象，thenable对象指该对象具有then方法。

let thenable_obj = {
	then(resolve,reject){
		resolve('this is a thenable_obj');
	}
}
let new_res = Promise.resolve(thenable_obj);
new_res.then(value=>alert(value));
//Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。

//3、参数不是一个具有then方法的对象，或者不是一个对象
//创建一个Promise实例，然后把该参数当做是创建实例时，resolve的参数
var newp = Promise.resolve('foo');
newp.then((value)=>alert(value));
//相当于是下面这种写法的简写
new Promise(resolve => resolve('foo'));

//4、不带任何参数，则直接创建一个resolved状态的Promise实例

//可以通过这种方式快速创建一个resolved状态的Promise实例
setTimeout("console.log('flag',3)",0);
Promise.resolve()
.then(function () {
  console.log('flag',2);
});
console.log('flag',1);
//立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。
//所有resolve的then是在console.log('flag',1)之后，setTimeout之前输出的

//Promise.reject(arg)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
//与resolve方法不同的是，不管参数是何种形式，reject方法会把参数原封不动的作为失败态回调的参数
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable);  // true
})
