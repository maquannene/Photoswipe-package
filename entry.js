// 解决点击延迟
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

import Vue from 'vue'
import App from './vue-component/App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})