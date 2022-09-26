import Vue from 'vue'

let vm = new Vue({
  el: '#app',
  // template: ``,
  // render(createElement) {
  //   return createElement()
  // },
  data() {
    return {
      title: '学生列表',
      classNum: 1,
      total: '0',
      teacher: ['张三', '李四'],
      students: [{
        id: 1,
        name: '小红'
      }, {
        id: 2,
        name: '小明'
      }],
      person: {
        name: '张三',
        age: 34,
        text: '1'
      }
    }
  }
})
console.log()