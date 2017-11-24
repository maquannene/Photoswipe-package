require('./src/photoswipe.css');
require('./src/default-skin/default-skin.css');
import imgPreviewer from './src/photoswipepackage.js'

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.PreviewLite = factory();
	}
})(window, function () {
  return imgPreviewer;
});

import Vue from 'vue'
import App from './vue-component/App.vue'

// 解决点击延迟
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

new Vue({
  el: '#app',
  render: h => h(App)
})