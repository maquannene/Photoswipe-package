/*深一层封装photoswipe 暴露接口*/
var photoswipeObj = {
    // 创建弹出框图片
    createGalleryDialog: function (data, dom) {
        // 如果存在则不在渲染
        if (document.querySelector('#gallery')) {
            return;
        }
        var body = document.body;
        var galleryDom = document.createElement("DIV");
        galleryDom.id = 'gallery';
        galleryDom.className = 'pswp';

        // append body  dialog
        body.appendChild(galleryDom);
        var galleryHtml = '\
        <div class="pswp__bg"></div>\
        <div class="pswp__scroll-wrap">\
          <div class="pswp__container">\
            <div class="pswp__item"></div>\
            <div class="pswp__item"></div>\
            <div class="pswp__item"></div>\
          </div>\
          <div class="pswp__ui pswp__ui--hidden">\
            <div class="pswp__top-bar">\
                <div class="pswp__counter"></div>\
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\
                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\
                <div class="pswp__preloader">\
                    <div class="pswp__preloader__icn">\
                      <div class="pswp__preloader__cut">\
                        <div class="pswp__preloader__donut"></div>\
                      </div>\
                    </div>\
                </div>\
            </div>\
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
                <div class="pswp__share-tooltip"></div>\
            </div>\
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\
            <div class="pswp__caption">\
              <div class="pswp__caption__center"></div>\
            </div>\
          </div>\
        </div>';
        // <button class="pswp__button pswp__button--share" title="Share"></button>\
        galleryDom.innerHTML = galleryHtml;
        // 初始化
        photoswipeObj.initPhotoSwipeFromDOM(data, dom);
    },
    initPhotoSwipeFromDOM: function(data, imgSelector) {
    
        var parseThumbnailElements = function(params) {
            var showItem = data[params.index]
            if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
                var img = new Image()
                img.onload = function () {
                    showItem.w = this.width
                    showItem.h = this.height
                    initPhotoSwipe(params)
                }
                img.src = showItem.src
            } else {
                initPhotoSwipe(params)
            }
        };

        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.currentTarget;
            var index = eTarget.getAttribute('data-pswp-index') * 1 - 1
            var clickedGallery = eTarget.parentNode;
            if(index >= 0) {
                openPhotoSwipe( index );
            }
            return false;
        };

        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};

            if(hash.length < 5) { // pid=1
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, disableAnimation, fromURL) {
            var params = {
                index: index,
                disableAnimation: disableAnimation,
                fromURL: fromURL
            }
            parseThumbnailElements(params);
        };

        var initPhotoSwipe = function (params) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var items = data
            var index = params.index
            var disableAnimation = params.disableAnimation
            var fromURL = params.fromURL
            console.log(data, index)
            // define options (if needed)
            var options = {
                getThumbBoundsFn: function(index) {
                    // See Options->getThumbBoundsFn section of docs for more info
                    var thumbnail = document.querySelectorAll( imgSelector )[index],
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect(); 
                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                },
                addCaptionHTMLFn: function(item, captionEl, isFake) {
                    console.log(item, captionEl)
                    var author = item.author ? '<br/><small>Photo:' + item.author + '</small>' : '';
                    captionEl.children[0].innerHTML = author;
                    return true;
                },
                tapToClose: true,
                index: parseInt(index, 10)
            };
            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }

            var radios = document.getElementsByName('gallery-style');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    if(radios[i].id == 'radio-all-controls') {

                    } else if(radios[i].id == 'radio-minimal-black') {
                        options.mainClass = 'pswp--minimal--dark';
                        options.barsSize = {top:0,bottom:0};
                        options.captionEl = false;
                        options.fullscreenEl = false;
                        options.shareEl = false;
                        options.bgOpacity = 0.85;
                        options.tapToToggleControls = false;
                    }
                    break;
                }
            }

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

            // see: http://photoswipe.com/documentation/responsive-images.html
            var realViewportWidth,
                useLargeImages = false,
                firstResize = true,
                imageSrcWillChange;

            gallery.listen('beforeResize', function() {
                var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                dpiRatio = Math.min(dpiRatio, 2.5);
                realViewportWidth = gallery.viewportSize.x * dpiRatio;

                if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
                    if(!useLargeImages) {
                        useLargeImages = true;
                        imageSrcWillChange = true;
                    }
                } else {
                    if(useLargeImages) {
                        useLargeImages = false;
                        imageSrcWillChange = true;
                    }
                }
                if(imageSrcWillChange && !firstResize) {
                    gallery.invalidateCurrItems();
                }
                if(firstResize) {
                    firstResize = false;
                }
                imageSrcWillChange = false;
            });

            gallery.listen('gettingData', function(index, item) {
                if (!item.w || !item.h || item.w < 1 || item.h < 1) {
                    var img = new Image()
                    img.onload = function () {
                        item.w = this.width
                        item.h = this.height
                        gallery.updateSize(true)
                    }
                    img.src = item.src
                }
            });

            gallery.init();
        }

        // select all gallery elements
        var imgElements = document.querySelectorAll( imgSelector );
        for(var i = 0, l = imgElements.length; i < l; i++) {
            imgElements[i].setAttribute('data-pswp-index', i+1);
            imgElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( (hashData.pid * 1 - 1), true, true );
        }
    }
}

window.photoswipe = {
    init: function (data, dom) {
        var newData = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {
                src: data[i].src,
                w: 0,
                h: 0,
                author: data[i].author || '',
                msg: data[i].msg || ''
            };
            newData.push(obj);
        }
        photoswipeObj.createGalleryDialog(newData, dom);
    }
}