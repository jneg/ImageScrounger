<template lang="pug">
div(class="input-field inline")
  input(v-model="uri")
  label Uri
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
  }
}
</script>
