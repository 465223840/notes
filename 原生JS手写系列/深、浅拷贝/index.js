//浅拷贝
const copy = (origin) => {
    let newObj = origin instanceof Array ? [] : {}
    for (const key in origin) {
        if (Object.hasOwnProperty.call(origin, key)) {
            newObj[key] = origin[key];
        }
    }
    return newObj
}


const newObj = Object.assign(origin)

//深拷贝

function deepClone(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}