<template lang="pug">
div(class="ui fluid left icon input")
  input(v-model="uri" placeholder="Uri")
  i(class="browser icon")
  button(@click="scroungeUri" id="scroungeButton" class="ui teal basic button") Scrounge
</template>

<script>
import Store from '../Store/Store.js'

export default {
  computed: {
    uri: {
      get() { return Store.getters.uri },
      set(value) { Store.commit('setUri', value) }
    }
  },
  methods: {
    scroungeUri() {
      this.$socket.emit('ScroungeUri', Store.getters.uri)
    }
  },
  mounted() {
    this.$options.sockets.ImageUris = (imageUris) => {
      Store.commit('setImageUris', imageUris)
    }
  }
}
</script>

<style lang="stylus" scoped>
#scroungeButton
  margin-left: 10px
</style>
