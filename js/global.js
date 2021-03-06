// window.CONTEXT_PATH = "http://localhost:8000/d3.js/graph/public/index.php";
window.CONTEXT_PATH = "http://localhost/d3.js/graph/public/index.php";

var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};

document.getElementById = (function(func) {
    return function() {
        return func.apply(document, arguments);
    }
})(document.getElementById);
var getId = document.getElementById;

Function.prototype.bind = function(context) {
    var self = this,
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
    return function() {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
};

/**
 * var load_js = new Script(script_onload);
 * load_js.set("http://static.gongju.com/js/jquery-1.4.4.min.js");
 *
 * @param callback
 */
function Script(callback) {
    var js = document.createElement("script");
    this.js = js;
    js.type = "text/javascript";
    document.body.appendChild(js);

    Script.prototype.set = function(url) {
        this.js.src = url;
    };
    if (callback) {
        if (navigator.appName.toLowerCase().indexOf('netscape') === -1) {
            js.onreadystatechange = function() {
                js.readyState === 'complete' && callback(this);
            }
        } else {
            js.onload = function() {
                callback(this);
            }
        }
    }
}
