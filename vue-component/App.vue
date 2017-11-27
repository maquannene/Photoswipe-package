<template>
  <div>
    <ul class="preview-list">
      <li v-for="(img, index) in imgs" :key="index" @click="showImg(index)">
        <img class="preview-img-vue" :src="img.src" alt="" style="width: 100px;">
      </li>
    </ul>
    
    <photo-package :list="imgs" :selector="selector" @on-close="closeHandler" :slotDesc="true" ref="previewer">
      <div
        slot="img-desc"
        slot-scope="props"
        class="img-desc white">
        <p class="author">{{ props.item.author ? props.item.author : '' }}</p>
        <p>{{ props.item.desc ? props.item.desc : '' }}</p>
      </div>
    </photo-package>

  </div>
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
          // 作者
          author: 'Folkert Gorter',
          // 简介
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
      selector: '.preview-img-vue'
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
<style scoped>
ul, li {
  list-style: none;
}
ul {
  padding: 0;
  overflow: hidden;
}
ul .preview-img-vue {
  margin-right: 15px;
  float: left;
}
.img-desc p{
  margin: 0;
  line-height: 1.5;
}
.img-desc .author {
  margin: 10px 0;
  font-size: 12px;
  color: #fff;
}
</style>
