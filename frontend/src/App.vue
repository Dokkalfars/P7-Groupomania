<template>
    <div id="app">
      <Navbar></Navbar>
      <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
    name: "App",
    components: {
      Navbar
    }
}
</script>

<style>
  body {
    background: rgb(36,37,38);
    background: linear-gradient(90deg, rgba(36,37,38,1) 0%, rgba(24,25,26,1) 100%);
    color: white;
  }
</style>
