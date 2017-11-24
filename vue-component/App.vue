<template>
  <div>
    <ul class="preview-list">
      <li v-for="(img, index) in imgs" :key="index" @click="showImg(index)">
        <img class="preview-img-vue" :src="img.src" alt="" style="width: 100px;">
      </li>
    </ul>
    
    <preview-lite :list="imgs" :selector="selector" @on-close="closeHandler" ref="previewer"></preview-lite>

  </div>
</template>

<script>
import PreviewLite from './Previewer'

export default {
  name: "vue-previewer",
  components: {
    PreviewLite,
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
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
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
</style>
