<template lang="pug">
div(class="ui left icon input")
  input(v-model="maxImageSize" placeholder="Px" size="4")
  i(class="expand icon")
</template>

<script>
import Store from '../Store/Store.js'

export default {
  computed: {
    maxImageSize: {
      get() { return Store.getters.maxImageSize },
      set(value) { Store.commit('setMaxImageSize', value) }
    }
  }
}
</script>
