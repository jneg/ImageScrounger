import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uri: '',
    maxImageSize: '300',
    imageUris: []
  },
  getters: {
    uri: (state) => state.uri,
    maxImageSize: (state) => state.maxImageSize,
    imageUris: (state) => state.imageUris
  },
  mutations: {
    setUri: (state, uri) => state.uri = uri,
    setMaxImageSize: (state, maxImageSize) => state.maxImageSize = maxImageSize,
    setImageUris: (state, imageUris) => state.imageUris = imageUris
  }
})
