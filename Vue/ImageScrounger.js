import Vue from 'vue'
import ImageScrounger from './ImageScrounger.vue'
import Uri from './Uri.vue'
import SizeControl from './SizeControl.vue'
import ImageGrid from './ImageGrid.vue'

Vue.component('Uri', Uri)
Vue.component('SizeControl', SizeControl)
Vue.component('ImageGrid', ImageGrid)

new Vue({
  el: '#Mount',
  render: h => h(ImageScrounger)
})
