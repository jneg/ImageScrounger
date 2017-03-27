import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import Socketio from  'socket.io-client'
import Store from './Store/Store.js'
import ImageScrounger from './Vue/ImageScrounger.vue'
import Uri from './Vue/Uri.vue'
import SizeControl from './Vue/SizeControl.vue'
import ImageGrid from './Vue/ImageGrid.vue'

Vue.use(VueSocketio, 'http://localhost:3000')
Vue.use(VueSocketio, Socketio('http://localhost:3000'), Store)

Vue.component('Uri', Uri)
Vue.component('SizeControl', SizeControl)
Vue.component('ImageGrid', ImageGrid)

new Vue({
  el: '#Mount',
  render: h => h(ImageScrounger)
})
