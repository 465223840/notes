class EventEmitter {

    constructor() {
        this.cache = {}
    }
    on(name, fn) {
        let cbs = this.cache[name]
        if (!cbs) {
            this.cache[name] = [fn]
            console.log(this.cache)
            return
        }
        cbs.push(fn)
    }
    off(name, fn) {
        const cbs = this.cache[name];
        if (cbs) {
            const index = cbs.findIndex(f => f === fn || f.callback === fn)
            if (index >= 0) {
                cbs.splice(index, 1)
            }
        }
    }
    emit(name, once = false, ...args) {
        const cbs = this.cache[name];
        if (cbs && cbs.length) {
            // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
            let _cbs = cbs.slice()
            _cbs.map((fn, index) => {
                fn(...args)
                once && cbs.splice(index, 1)
            })
        }
    }

}


// 测试
let eventBus = new EventEmitter()
let fn1 = function (name, age) {
    console.log(`${name} ${age}`)
}
let fn2 = function (name, age) {
    console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
// '布兰 12'
// 'hello, 布兰 12'