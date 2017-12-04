<template>
  <div id="app">
    <div class="header">
      <m-header></m-header>
      <tab></tab>      
    </div>

    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header.vue'
import tab from 'components/tab/tab.vue'
import player from 'components/player/player.vue'
export default {
  components: {
    MHeader,
    tab,
    player
  }
}
</script>

<style scoped lang='stylus'>
@import 'common/stylus/variable'

#app
  color $color-theme
.header
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background: #222;
</style>
