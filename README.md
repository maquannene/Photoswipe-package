
#Photoswipe-package

> Package and modify for Photoswipe

## DEMO 

[DEMO](http://jaywii.github.io/private/photo-package-demo/)

## Feature

1. Support long press save image in Safari.
2. Simpler interface, more convenient use.
3. Vue2.0 component support.
4. Vue2.0 image detail Slot support.
5. (2017.11.28) Support Photoswipe all original options and add a new option `topBarEl` (you can use this option to show/hide top-bar)

## Usage

Clone or Download this resp, you can get the [photoswipe-package.js](http://jaywii.github.io/private/photo-package-demo/photoswipe-package.js) Or Vue Component `Previewer` in /build


### JS Usage

```html
<script type="text/javascript" src="/path/photoswipe-package.js"></script>

<script>
var arr = [image data obj array]
var options = { Photoswipe options obj }
// close callback is optional.
PhotoPackage.init(arr, '.image-selector', options, closeCallback);
// display image gallery
PhotoPackage.show(index)
</script>
```

### Vue Usage

copy /build/Previewer folder to your project, Previewer folder include 3 files : `index.js` , `myPhotoswipe.vue`, `photoswipeLite.js`

```js
// javascript
import PhotoPackage from './Previewer'

export default {
  components: {
    PhotoPackage,
  }
}
```

```html
  <!-- template -->
  <photo-package 
    :list="imgs" 
    :selector=".preview-img-vue" 
    :options="options" 
    @on-close="closeHandler" 
    ref="previewer">
  </photo-package>
```

```js
export default {
  data() {
    return {
      imgs: [image data obj],
      options: {
        Photoswipe options obj
      }
    }
  },
  methods: {
    showImg (index) {
      this.$refs.previewer.show(index)
    },
    closeHandler () {
      console.log('vue cloooooooose')
    }
  }
}
```

## Example

### JS Example

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

// close callback and options are optional.
var options = {
    closeEl: true,
    tapToClose: false,
    topBarEl: true,
    loop: false
}
PhotoPackage.init(arr, '.preview-img', options, function () {
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

### Vue Example

```html
<template>
  <ul class="preview-list">
    <li v-for="(img, index) in imgs" :key="index" @click="showImg(index)">
      <img class="preview-img-vue" :src="img.src" alt="" style="width: 100px;">
    </li>
  </ul>
  
  <photo-package :list="imgs" :selector=".preview-img-vue" :options="options" @on-close="closeHandler" :slotDesc="false" ref="previewer"></photo-package>

  <!-- if you want a more personal image footer(image describe, like author, detail...), you can set slotDesc to true -->
  <!-- tips: props.item === imgs[index] , slot must be 'img-desc' -->
  <!-- 
  <photo-package :list="imgs" :selector="selector" :options="options" @on-close="closeHandler" :slotDesc="true" ref="previewer">
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
      ],
      options: {
        topBarEl: true,
        closeEl: false,
        shareEl: true,
        loop: false
      }
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
