var through = require('through2');
var path = require('path');

var condition = {
    isDebug:{begin:"IFDEBUG", end:"FIDEBUG"},
    isApp:{begin:"IFAPP", end:"FIAPP"},
    isH5:{begin:"IFH5", end:"FIH5"},
    isWeChat:{begin:"IFWECHAT", end:"FIWECHAT"},
}

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {

        }
        else if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }
        else if (file.isBuffer()) {
            var oldLen = file.contents.length;
            var content = process(file.contents.toString(), options || {});
            file.contents = new Buffer(content);

            var delta = oldLen - file.contents.length;
            if (delta > 0) {
                var fn = file.history[0] || '';
                fn = path.basename(fn);
                console.log('gulp-ifcompile:\t' + fn + '\t' + delta + ' bytes droped');
            }
        }

        this.push(file);

        cb();

        function process(js, opt) {
            for (var key in condition) {
                var reg = new RegExp("\\/\\*" + condition[key].begin + "([\\s\\S]+?)" + condition[key].end + "\\*\\/", "g");
                js = js.replace(reg, opt[key] ? "$1" : "");
            }

            return js;
        }
    });
};