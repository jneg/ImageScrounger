import Vue from 'vue'
import ImageScrounger from './Vue/ImageScrounger.vue'
import Uri from './Vue/Uri.vue'
import SizeControl from './Vue/SizeControl.vue'
import ImageGrid from './Vue/ImageGrid.vue'

Vue.component('Uri', Uri)
Vue.component('SizeControl', SizeControl)
Vue.component('ImageGrid', ImageGrid)

new Vue({
  el: '#Mount',
  render: h => h(ImageScrounger)
})
