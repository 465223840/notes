import arrMethods from "./array";
import {
  isArray,
  defineReactiveData
} from "util";

function observeArr(data) {
  for (const item of data) {
    observe(item)
  }
}

function observe(data) {
  if (typeof data !== 'object' || data === null) return;
  return new Observer(data)
}

function Observer(data) {
  if (isArray) {
    data.__proto__ = arrMethods;
    observeArr(data)
  } else {
    this.walk(data);
  }
}
Observer.prototype.walk = function (data) {

  var keys = Object.keys(data);

  for (const key of keys) {
    defineReactiveData(data, key, data[key])
  }
}

export default observe;