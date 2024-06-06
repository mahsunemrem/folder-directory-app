<template>
  <FolderList/>
</template>

<script>
import FolderList from './components/FolderList.vue'

export default {
  name: 'App',
  components: {
    FolderList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
