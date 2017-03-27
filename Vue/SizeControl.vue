<template lang="pug">
div(class="ui left icon input")
  input(v-model="maxImageSize" placeholder="Px" size="4")
  i(class="expand icon")
</template>

<script>
export default {
  data() {
    return {
      maxImageSize: '300'
    }
  }
}
</script>
