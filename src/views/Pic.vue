<template>
  <div class="Pic">
    <h1>This is an Pic page</h1>
    <div class="bigPic">
      <!-- ID: {{ $route.params.id }} -->
      ID: {{ id }}
    </div>
  </div>
</template>

<style lang="sass">
  .bigPic
    width: 400px
    height: 300px
    border: 5px solid #000
    margin: 0 auto
</style>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  mounted () {
    if (this.$route.meta.lightbox) {
      this.$store.commit('LIGHTBOX')
    }
  },
  updated () {
    if (this.$route.meta.lightbox) {
      this.$store.commit('LIGHTBOX')
    }
  }
}
</script>
