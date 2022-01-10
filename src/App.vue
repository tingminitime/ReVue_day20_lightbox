<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link :to="{ name: 'PicList' }">
        PicList
      </router-link> |
      <router-link :to="{ name: 'Pic', params: { id: 1 } }">
        Pic 1
      </router-link> |
      <router-link :to="{ name: 'Pic', params: { id: 2 } }">
        Pic 2
      </router-link>
      <!-- <router-link to="/">
        Home
      </router-link> |
      <router-link to="/pic">
        PicList
      </router-link> |
      <router-link to="/pic/1">
        Pic 1
      </router-link> |
      <router-link to="/pic/2">
        Pic 2
      </router-link> -->
    </div>
    <router-view name="default"></router-view>
    <!-- 蓋在前面當 lightbox -->
    <div
      v-show="$route.meta.lightbox"
      class="lightbox"
    >
      <div class="content">
        <router-view name="lightbox"></router-view>
      </div>
      <button
        class="close"
        @click="closeHandler"
      >
        X
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeHandler () {
      const count = this.$store.state.lightbox * -1
      console.log(count)
      this.$router.go(count)
      this.$store.commit('RESET_LIGHTBOX')
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/reboot/_reset'

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

#nav
  padding: 30px

  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983

.lightbox
  position: fixed
  top: 50px
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,.5)
  display: flex
  justify-content: center
  align-items: center

.content
  width: \min(50%, 800px)
  height: \min(75%, 600px)
  background-color: #fff

.close
  font-size: 24px
  padding: 12px

.d-n
  display: none

</style>
