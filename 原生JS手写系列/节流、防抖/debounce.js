function debounce(fn, delay) {
    let timer = null;
    return function () {
        var _self = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
            fn.apply(_self, args)
        }, delay);
    }
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};