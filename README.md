虽然es6现在还没有普及，但是未来一定会全面推广es6的。早学晚学都得学，特地新建一个仓库来熟悉es6的语法。文档中大部分的案例都来自阮一峰老师的书籍《ECMAScript 6入门》，膜拜大神。虽然现在最新的chrome55已经支持了80%的es6语法，业界良心，但是在这个浏览器百花齐放的年代，我们还是得用其他工具进行转义，将es6的代码转义成es5代码为大多数现代浏览器识别，我这里使用的工具是babel的浏览器版本（browser.js），当然你们可以使用google的Traceur转码器。这里简单介绍下browser.js的使用。另外babel还有配合node的服务端版本，以及配合webpack打包版本，而且现在react也是用babel来进行转义，大家可以在网上查看其它资料。



> 使用方法：先引入browser.js文件，然后设置要使用es6语法的 script 标签设置 type=" text/babel "

	<script src="browser.js"></script>
	<script type="text/babel">
	// Your ES6 code
	</script>