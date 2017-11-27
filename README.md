
#Photoswipe-package

> Package and modify for Photoswipe

## DEMO 

[DEMO](http://jaywii.github.io/private/photo-package-demo/)

## Feature

1. Support long press save image in Safari.
2. Simpler interface, more convenient use.
3. Vue2.0 component support.
4. Vue2.0 image detail Slot support.

## Usage

Clone or Download this resp, you can get the [photoswipe-package.js](http://jaywii.github.io/private/photo-package-demo/photoswipe-package.js) Or Vue Component `Previewer` in /build

### JS Usage

```html
<div class="demo-gallery">
    <div class="preview-img" data-index="0" style="background-image: url('https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg')"></div>
    <img class="preview-img" data-index="1" src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_b.jpg" alt="">
    <img class="preview-img" data-index="2" src="https://farm4.staticflickr.com/3920/15008465772_383e697089_b.jpg" alt="">
</div>

<script type="text/javascript" src="/path/photoswipe-package.js"></script>

<script>
// author and desc are optional.
var arr = [
    {
        src: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg',
        author: 'Folkert Gorter',
        desc: 'This is dummy caption.'
    },
    {
        src: 'https://farm6.staticflickr.com/5584/14985868676_4b802b932a_b.jpg',
    },
    {
        src: 'https://farm4.staticflickr.com/3920/15008465772_383e697089_b.jpg',
        author: 'Folkert Gorter2',
        desc: 'It\'s a dummy caption. He who searches for meaning here will be sorely disappointed.'
    }
]

// close function is optional.
PhotoPackage.init(arr, '.preview-img', function () {
    console.log('js cloooooooose');
});

document.querySelector('.demo-gallery').addEventListener('click', function (e) {
    var target = e.target;
    var index = target.getAttribute('data-index')
    // Dispaly image gallery
    PhotoPackage.show(index)
})
</script>
```

### Vue Usage

copy /build/Previewer folder to your project, Previewer folder include 3 files : `index.js` , `myPhotoswipe.vue`, `photoswipeLite.js`

```html
<template>
  <ul class="preview-list">
    <li v-for="(img, index) in imgs" :key="index" @click="showImg(index)">
      <img class="preview-img-vue" :src="img.src" alt="" style="width: 100px;">
    </li>
  </ul>
  
  <photo-package :list="imgs" :selector=".preview-img-vue" @on-close="closeHandler" :slotDesc="false" ref="previewer"></photo-package>

  <!-- if you want a more personal image footer(image describe, like author, detail...), you can set slotDesc to true -->
  <!-- tips: props.item === imgs[index] , slot must be 'img-desc' -->
  <!-- 
  <photo-package :list="imgs" :selector="selector" @on-close="closeHandler" :slotDesc="true" ref="previewer">
    <div slot="img-desc" slot-scope="props">
      <p class="author">{{ props.item.author ? props.item.author : '' }}</p>
      <p>{{ props.item.desc ? props.item.desc : '' }}</p>
    </div>
  </photo-package> 
  -->

</template>

<script>
import PhotoPackage from './Previewer'

export default {
  name: "vue-previewer",
  components: {
    PhotoPackage,
  },
  data() {
    return {
      imgs: [
        {
          src: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg',
          author: 'Folkert Gorter',
          desc: 'This is dummy caption.'
        },
        {
          src: 'https://farm6.staticflickr.com/5584/14985868676_4b802b932a_b.jpg'
        },
        {
          src: 'https://farm4.staticflickr.com/3920/15008465772_383e697089_b.jpg',
          author: 'Folkert Gorter2',
          desc: 'It\'s a dummy caption. He who searches for meaning here will be sorely disappointed.'
        }
      ]
    }
  },
  methods: {
    showImg (index) {
      // console.log(this.$refs.previewer.photoswipe)
      this.$refs.previewer.show(index)
    },
    closeHandler () {
      console.log('vue cloooooooose')
    }
  }
}
</script>

```

## License

MIT
