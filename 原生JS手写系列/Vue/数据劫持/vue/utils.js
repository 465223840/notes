import observe from "./observer";

const ARR_METHODS = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

function proxyData(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      console.log('响应是数据获取')
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    }
  })
}

function isObject(value) {
  return typeof value === 'object' && value !== null
}

function isArray(value) {
  return Array.isArray(value)
}

function defineReactiveData(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue)
      value = newValue
    }
  })
}


export {
  ARR_METHODS,
  proxyData,
  defineReactiveData
}