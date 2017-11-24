<template>
  <div class="pswp jaywii-preview" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
const photoswipeObj = require('./myPhotoswipe.js')
const PhotoSwipe = photoswipeObj.PhotoSwipe
const UI = photoswipeObj.PhotoSwipeUI_Default

export default {
  name: 'previewer',
  computed: {
    imgs () {
      return this.list.map(one => {
        if (typeof one.w === 'undefined') {
          one.w = 0
          one.h = 0
        }
        return one
      })
    }
  },
  methods: {
    init (index) {
      const self = this
      const showItem = this.imgs[index]
      if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
        const img = new Image()
        img.onload = function () {
          showItem.w = this.width
          showItem.h = this.height
          self.__init(index)
        }
        img.src = showItem.src
      } else {
        this.__init(index)
      }
    },
    __init (index) {
      const self = this
      let options = {
        getThumbBoundsFn: (index, el) => {
          let thumbnail = document.querySelectorAll(self.selector)[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect();
          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width}
        },
        addCaptionHTMLFn: (item, captionEl, isFake) => {
            let author = item.author ? '<small>' + item.author + '</small>' : ''
            let desc = item.desc ? '<br/><p class="img-desc">' + item.desc + '</p>' : ''
            captionEl.children[0].innerHTML = author + desc
            return true
        },
        tapToClose: true,
        index: parseInt(index, 10),
        shareEl: false,
        history: true,
        captionEl: true,
        shareButtons: [
          {id: 'download', label: '下载图片', url: '{{raw_image_url}}', download: true}
        ]
      };
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options)

      this.photoswipe.listen('gettingData', function (index, item) {
        if (!item.w || !item.h || item.w < 1 || item.h < 1) {
          const img = new Image()
          img.onload = function () {
            item.w = this.width
            item.h = this.height
            self.photoswipe.updateSize(true)
          }
          img.src = item.src
        }
      })

      this.photoswipe.init()
      this.photoswipe.listen('close', () => {
        this.$emit('on-close')
      })
    },
    show (index) {
      this.init(index)
    },
    close () {
      this.photoswipe.close()
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    selector: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
</style>
