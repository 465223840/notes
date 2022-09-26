function throttle(fn, delay) {
    var t = null;
    var startTime = new Date().getTime();
    return function () {
        var _self = this;
        var args = arguments;
        var curTime = new Date().getTime()
        clearTimeout(t)

        if (curTime - startTime >= delay) {

            fn.apply(_self, args)
            curTime = startTime
        } else {
            t = setTimeout(() => {
                fn, zzapply(_self, args)
            }, delay);
        }
    }
}