import observe from "../observer";

var originArrMethods = Array.prototype,
  arrMethods = Object.create(originArrMethods);

arrMethods.map(m => {
  arrMethods[m] = function () {
    var args = Array.prototype.slice.call(arguments),
      //原数组方法  
      rt = originArrMethods[m].apply(this, args);
    var newArr;
    switch (m) {
      case 'push':
      case 'unshift':
        newArr = args
        break;
      case 'splice':
        newArr = args.slice(2)
        break;
      default:
        break;
    }
    newArr && observe(newArr)
    return rt
  }
})

export default arrMethods