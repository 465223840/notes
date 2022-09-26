class Vue {
    constructor(opt) {
        this.$data = proxyData(opt.data)
    }

}
var vm = new Vue({
    data: {
        obj: {
            a: 1,
            b: 2
        },
        title: 'test'
    }
})

function proxyData(data) {

    // const keys = object.keys(data)
    for (const key in data) {
        const item = data[key]
        if (typeof item !== 'object') {

        } else {
            proxyData(data[key])
        }
    }
}

function defineReactiveData(data) {

}

function observe(data) {

}