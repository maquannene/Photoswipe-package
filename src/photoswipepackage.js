import PhotoSwipe from './photoswipe.js'
import PhotoSwipeUI_Default from './photoswipe-ui-default.js'
import objectAssign from 'object-assign'

/*深一层封装photoswipe 暴露接口*/
var photoswipeObj = {
    data: [],
    selector: '',
    gallery: {},
    options: {},
    closeHandler: null,
    // 创建弹出框图片
    createGalleryDialog: function (data) {
        // 如果存在则不在渲染，仅仅初始化数据
        if (!document.querySelector('#gallery-pswp')) {
            var body = document.body;
            var galleryDom = document.createElement("DIV");
            galleryDom.id = 'gallery-pswp';
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
                    <button class="pswp__button pswp__button--share" title="Share"></button>\
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
        }
        // 初始化数据
        this.initGalleryData(data);
    },
    initGalleryData: function (orData) {
        var newData = [];
        for (var i = 0; i < orData.length; i++) {
            var obj = {
                src: orData[i].src,
                w: 0,
                h: 0,
                author: orData[i].author || '',
                desc: orData[i].desc || ''
            };
            newData.push(obj);
        }
        this.data = newData
    },
    showGallery: function (index, el) {
        var self = this
        var showItem = this.data[index]

        if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
            var img = new Image()
            img.onload = function () {
                showItem.w = this.width
                showItem.h = this.height
                self.__showGallery(index, el)
            }
            img.src = showItem.src
        } else {
            self.__showGallery(index, el)
        }
    },
    __showGallery: function (index, el) {
        var self = this
        var pswpElement = document.querySelectorAll('#gallery-pswp')[0];
        var options = objectAssign({
            getThumbBoundsFn: function(index, el) {
                var thumbnail = document.querySelectorAll(self.selector)[index];
                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                var rect = thumbnail.getBoundingClientRect(); 
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            addCaptionHTMLFn: function(item, captionEl, isFake) {
                var author = item.author ? '<small>' + item.author + '</small>' : '';
                var desc = item.desc ? '<br/><p class="img-desc">' + item.desc + '</p>' : '';
                captionEl.children[0].innerHTML = author + desc;
                return true;
            },
            tapToClose: true,
            index: parseInt(index, 10),
            history: true,
            captionEl: true,
            shareEl: false
        }, this.options);

        var topBarEl = document.querySelector("#gallery-pswp .pswp__top-bar")
        if (this.options.topBarEl === false) {
            topBarEl.style.display = 'none'
        } else {
            topBarEl.style.display = 'block'
        }

        this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.data, options);
  
        this.gallery.listen('gettingData', function (index, item) {
            if (!item.w || !item.h || item.w < 1 || item.h < 1) {
                const img = new Image();
                img.onload = function () {
                item.w = this.width;
                item.h = this.height;
                self.gallery.updateSize(true);
                }
                img.src = item.src;
            }
        });
        
        this.gallery.setCurrentEl(el)
        this.gallery.init();
        this.gallery.listen('close', function () {
            if (self.closeHandler) {
                self.closeHandler()
            }
        });
    },
    getGallery: function () {
        return this.gallery
    }
}

var imgPreviewer = {
    init: function (data, dom, options, closeFn) {
        if (typeof(data) !== 'object' || typeof(dom) !== 'string') {
            console.error('data 或 selector 不能为空！')
            return
        }
        photoswipeObj.selector = dom;
        photoswipeObj.options = options;
        photoswipeObj.closeHandler = closeFn;
        photoswipeObj.createGalleryDialog(data);
    },
    update: function (data) {
        photoswipeObj.initGalleryData(data);
    },
    show: function (index) {
        photoswipeObj.showGallery(index)
    },
    getPhotoswipe: function () {
        return photoswipeObj.getGallery()
    }
}

export default imgPreviewer