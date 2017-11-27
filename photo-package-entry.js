require('./src/photoswipe.css');
require('./src/default-skin/default-skin.css');
import imgPreviewer from './src/photoswipepackage.js'

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.PhotoPackage = factory();
	}
})(window, function () {
  return imgPreviewer;
});