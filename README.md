# gulp-ifcompile
A conditional compling plugin for gulp. You can easily output two different codes for conditional with one source code.

一个用于实现条件编译的gulp插件。可以自行添加不同的条件，类似宏的预编译。
## Current condition
```+
	condition = {
    	isDebug:{begin:"IFDEBUG", end:"FIDEBUG"},
    	isApp:{begin:"IFAPP", end:"FIAPP"},
    	isH5:{begin:"IFH5", end:"FIH5"},
    	isWeChat:{begin:"IFWECHAT", end:"FIWECHAT"},
	}
```

## Usage in JS files Just use it like this:

```+
	/*IFCONDITION Any js here FICONDITION*/
```

Start with "/*IFCONDITION", end with"FICONDITION*/", and js code in the center. you can use it any where in js files.

eg:

```+
	$state.go('win', {dir: menu.winId /*IFCONDITION , reload: true FICONDITION*/})
```

or

```+
	/* IFCONDITION
		alert('Hi~');
	FICONDITION*/
```

Since it is a comment style, the code can run normaly even though gulp-ifcompile is not processed.

因为是注释的形式，故即使不运行gulp-ifcompile，也不影响js代码的运行。

## Config in gulp You should call this plugin before other js file processes, like this:

需要在js文件的其他处理过程之前调用此插件，像这样：

```+
gulp.task('js', function () {
	return gulp.src(sources)
        .pipe($.ifcompile(  {isDebug: !isProduction, isApp: !isProduction}  ))
        ...pipe other processes...
});
```

## options
isCondition: {bool = true}

If isCondition === false, all the codes between "/*IFCONDITION" and "FICONDITION*/" will be removed, otherwise the codes will be remained.

如果isDebug === false，所有"/*IFCONDITION" 和 "IFCONDITION*/"之间的代码都会被移除。 其他情况的isDebug，这些代码则会被保留。

