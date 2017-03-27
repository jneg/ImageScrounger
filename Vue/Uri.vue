<template lang="pug">
div(class="ui fluid left icon input")
  input(v-model="inputUri" placeholder="Uri")
  i(class="browser icon")
  button(@click="scroungeUri" class="ui teal basic button") Scrounge
</template>

<script>
const Socket = require('socket.io-client')('http://localhost:3000')

export default {
  data() {
    return {
      inputUri: ''
    }
  },
  methods: {
    scroungeUri() {
      Socket.emit('ScroungeUri', this.inputUri)
    }
  }
}
</script>

<style lang="stylus" scoped>
.basic.button
  margin-left: 10px
</style>
