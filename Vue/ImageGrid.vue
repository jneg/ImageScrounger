<template lang="pug">
div(class="ui basic segment")
  div(v-for="uri in uris" :style="imgContainerStyle")
    a(:href="uri" target="_blank")
      img(:src="uri" :style="imgStyle")
</template>

<script>
export default {
  props: ['uris', 'maxImageSize'],
  computed: {
    imgContainerStyle() {
      return {
        display: 'inline',
        margin: '5px'
      }
    },
    imgStyle() {
      return {
        maxHeight: this.maxImageSize + 'px',
        maxWidth: this.maxImageSize + 'px'
      }
    }
  }
}
</script>
