<template>
  <div class="PicList">
    <h1>This is an PicList page</h1>
    <!-- <router-link
      class="pic"
      to="/pic/1"
    >
      1
    </router-link> -->
    <!-- <router-link
      class="pic"
      to="/pic/2"
    >
      2
    </router-link> -->
    <router-link
      class="pic"
      :to="{ name: 'Pic', params: { id: 1 } }"
    >
      1
    </router-link>
    <router-link
      class="pic"
      :to="{ name: 'Pic', params: { id: 2 } }"
    >
      2
    </router-link>
  </div>
</template>

<style lang="sass">
  .pic
    display: inline-block
    width: 150px
    height: 100px
    border: 2px solid #000
    margin: 12px
</style>
