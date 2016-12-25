//关于更多js字符串编码查看文章：  http://www.ruanyifeng.com/blog/2014/12/unicode.html
//js采用UCS-2编码方式，所有字符串只能是两个字节的，超过两个字节的必须使用32位来表示
//即，只能采用  '\uXXXX'的形式表示一个字符串，XXXX为字符的码点
console.log("\uD842\uDFB7");  //𠮷

//这种表示法只能表示\u0000——\uFFFF之间的字符
// \u20BB是一个不可打印字符,所有会显示一个空格，然后后面跟了一个数字7
//相当于是 \u20BB + 7
console.log("\u20BB7");  // ₻7


//es6对js字符串编码进行了改进，如果超出了两个字节的编码放入大括号就可以正确解码了
console.log("\u{20BB7}");

//这里有一个将四个字节的编码处理为两个两字节编码方式的公式：
/*
H = Math.floor((c-0x10000) / 0x400)+0xD800
L = (c - 0x10000) % 0x400 + 0xDC00
*/
console.log("\u{1F680}");
var twoBytes = [];
twoBytes[0] = Math.floor((0x1F680-0x10000) / 0x400)+0xD800;
twoBytes[1] = (0x1F680 - 0x10000) % 0x400 + 0xDC00;
var byteString = twoBytes.map(byte=> byte.toString(16).toUpperCase());//\uD83D\uDE80
console.log(byteString);
console.log("\uD83D\uDE80");
console.log( "\u{1F680}"==="\uD83D\uDE80" ); //true



console.log('---------------------');
//charAt返回指定位置的字符串，但是碰到那些32位的字符是会出现问题
//charCodeAt返回字符串的编码，碰到32位同样会出现问题
//这两种方法都会将32位当做是两个不同的字符
var str = '🚀';
console.log(str.charAt(0)); //�
console.log(str.charAt(1)); //�
console.log(str.charCodeAt(0).toString(16)); // d83d
console.log(str.charCodeAt(1).toString(16)); // de80
//ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
console.log(str.codePointAt(0).toString(16)); //1f680
//虽然codePointAt能正确返回该字符的码点，但是通过该方法访问第二个字符时还是会会和charCodeAt一样
console.log(str.codePointAt(1).toString(16)); //de80

//ES7提供了charAt类似的方法at，能够正确识别32位编码的字符
//console.log(str.at(0)); //🚀   目前babel库不支持


//可以通过for-of的方法对字符串迭代获取字符码点
function getAllCode(s){
	let byteArr = [];
	//使用for-of循环能迭代出字符串中32位编码的字符，而传统for循环则会将该字符当做是两个字符
	for(let ch of s) {
		byteArr.push(ch.codePointAt(0).toString(16));
	}
	return byteArr;
}
console.log( getAllCode('𠮷a🚀') );

//也可以用过codePointAt方法判断当前字符串是两个字节还是四个字节的
function is32Bit(s) {
	return s.codePointAt(0) > 0xFFFF;
}
console.log(is32Bit('𠮷')); //true
console.log(is32Bit('a'));  //false

console.log('---------------------');
//String.fromCharCode(),根据码点返回对于字符串，缺陷与之前一样，不能之别32位的UTF-16字符
console.log( String.fromCharCode(0x1F680) ); //空
//es6中可以使用String.fromCodePoint()解决
console.log( String.fromCodePoint(0x1F680) );
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79));


console.log('---------------------');
var str = 'hello ECMAscript 6,I like it!';
//之前的js中只有indexOf方法来确定一个字符串是否包含在另一个字符串中。
//这里es6提供了三个新方法：inclueds，startsWith，endsWith
//1、includes  返回布尔值，表示是否找到参数字符串
console.log(str.includes('hello')); //true
//2、startsWith  返回布尔值，表示是否在字符串头部找到参数字符串
console.log(str.startsWith('hello')); //true
//3、endsWith  返回布尔值，表示是否在字符串尾部找到参数字符串
console.log(str.endsWith('!')); //true


console.log('---------------------');
//repeat(n),该方法的作用是，将字符串重复n次后返回
console.log('x'.repeat(5));// xxxxx
console.log('x'.repeat(2.6)); //xx  如果参数是小数会按照floor方式取整
console.log('x'.repeat(-0.6)); //''  0到-1之间的小数会被视为0,返回空字符串
console.log('x'.repeat(NaN));  //''  参数NaN被视为0
//console.log('x'.repeat(Infinity));  //Invalid count value(…)  Infinity或负数会报错
console.log('x'.repeat('3'));  //xxx  字符串为先强制转为数字
console.log('x'.repeat('3a'));  //''   这里先被转成NaN，然后变成0，所以返回空字符串


console.log('------字符串模板-------');
//模板字符串（template string）是增强版的字符串，用反引号（`）标识。
//它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
document.body.innerHTML=`
	<p>
		这是一个模板字符串，可以直接将标签写在其中
		<b>换行不用+重新拼接</b>
	</p>
	<div id="box"></div>
	<div id="list"></div>
`;
//下面来使用模板字符串嵌入变量。而且还能进行js运算
var name = 'Jack';
var age = 18;
var obj = {
	x:1,
	y:2
}
document.getElementById('box').innerHTML = `
	<p>这里可以嵌入变量</p>
	<p>姓名：${name}</p>
	<p>年龄：${age}</p>
	<hr>
	<p>还可以进行表达式运算</p>
	<p>${obj.x}+${obj.y}=${obj.x+obj.y}</p>
`;

//还能像后端使用模板一样进行循环输出
var List = ['jack','json','jay','jion'];
function compile(template){
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
  `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

var template = `
	<ol>
		<% for(var i=data.supplies.length-1; i>=0; i--){ %>
			<li><%= data.supplies[i] %></li>
		<% } %>
	</ol>
`
var parse = eval(compile(template));
document.getElementById('list').innerHTML = parse({ supplies: List });


//模板字符串还能当做函数传参，放在函数后面被调用来处理这个模板字符串
//这被称为模板标签功能
console.log(123);
console.log`123`;//通过这种方式传入的其实是一个数组，而不仅仅是一个数
//模板字符串被当做函数参数传入时会先转化为一个数组，我们看看复杂点的模板标签功能
console.log`加 法:${1}+${5}=${1+5}`;
//['加法:','+','=','']  1  5  6
//当做参数时，会把只是字符串的部分拼接成数组，字符串在碰到 ${} 表达式的时候分割开变成一个子元素
//且该数组还有一个raw属性，存储的是当前数组的，不过会把之前的字符进行转义。
//${} 表达式中返回的值会当做另一个参数传入函数。
//使用下面方法能把传入的参数重新拼接成之前的样子
function reconstruct(strarr,...values) {
	var output = '',len = strarr.length-1;
	for(let i=0;i<len;i++) {
		output += strarr[i] + values[i];
	}
	output += strarr[len];
	return output;
}

console.log( reconstruct`abc is ${3},but i like${5} xyz` );

//String.raw()  该方法专门用来将模板字符串进行转义

console.log( String.raw`Hi \n ${2+3}` );  // Hi \\n 5   不仅会计算出表达式的结果，还能将\进行转义
//也能做一个方法使用：
console.log( String.raw({
	raw:'text'
},0,1,2) );  //t0e1x2t