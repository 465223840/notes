const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

export default class MyPromise {

  constructor(executor) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallBacks = [];
    this.onRejectedCallbacks = [];

    function resolve(value) {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallBacks.forEach(fn => fn());
      }
    }
    function reject(reason) {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.value = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject)
    } catch (reason) {
      reject(reason)
    }
  }

  then(onFullfilled, onRejected) {
    let self = this;
    switch (self.status) {
      case PENDING:
        self.onFulfilledCallBacks.push(function () {
          onFullfilled(self.value)
        });
        self.onRejectedCallbacks.push(function () {
          onRejected(self.reason)
        });
        return;
      case FULFILLED:
        onFullfilled(self.value);
        break;
      case REJECTED:
        onRejected(self.reason);
        break;
      default:
    }
  }

  static resolve(value) {
    return new Promise((res, rej) => {
      res(value)
    })
  }

  static reject(reason) {
    return new Promise((res, rej) => {
      rej(reason)
    })
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let arr = [],
        index = 0
      const processData = (promise, index) => {
        if (++index === promises.this.length) {
          resolve(arr)
        }
        else {
          arr[i] = promise
        }
      }
      for (let i = 0; i < promises.length; i++) {
        let p = promises[i]
        if (p instanceof Promise) {
          p.then(res => {
            processData(res, i)
          }, err => {
            reject(err)
          })
        } else {
          processData(p, i)
        }
      }
    })
  }
}

// let arr = [];
// let index = 0;
// const processData = (key, value) => {
//   arr[key] = value;
//   if (++index === promises.length) {
//     resolve(arr);
//   }
// }
// for (let i = 0; i < promises.length; i++) {
//   let res = promises[i];
//   if (isPromsie(res)) {
//     res.then(data => {
//       processData(i, data);
//     }, err => {
//       reject(err);
//     })
//   } else {
//     processData(i, res);
//   }

// }