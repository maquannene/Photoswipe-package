require('./src/photoswipe.css');
require('./src/default-skin/default-skin.css');
import PhotoSwipe from './src/photoswipe.js'
import PhotoSwipeUI_Default from './src/photoswipe-ui-default.js'

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
    root.PhotoSwipe = factory().PhotoSwipe;
    root.PhotoSwipeUI_Default = factory().PhotoSwipeUI_Default;
	}
})(window, function () {
  return {
    PhotoSwipe: PhotoSwipe,
    PhotoSwipeUI_Default: PhotoSwipeUI_Default
  };
});