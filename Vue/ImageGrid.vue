<template lang="pug">
div(class="ui basic segment")
  div(v-for="uri in imageUris" v-bind:style="imgContainerStyle")
    a(:href="uri" target="_blank")
      img(:src="uri" v-bind:style="imgStyle")
</template>

<script>
import Store from '../Store/Store.js'

export default {
  computed: {
    imageUris() { return Store.getters.imageUris },
    imgContainerStyle() {
      return {
        display: 'inline',
        margin: '5px'
      }
    },
    imgStyle() {
      return {
        maxHeight: Store.getters.maxImageSize + 'px',
        maxWidth: Store.getters.maxImageSize + 'px'
      }
    }
  },
  mounted() {
    this.$options.sockets.ImageUris = (imageUris) => {
      Store.commit('setImageUris', imageUris)
    }
  }
}
</script>
