<template>
  <div id="app">
    <div class="container">
        <div class="row">
            <div class="col navbar">
            </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "App"
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
