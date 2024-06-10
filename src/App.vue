<template>
  <div class="container border">
    <h1>Folder Structure</h1>
    <hr />
    <div class="row justify-content-center m-3">
      <div class="col-lg-6">
        <SearchInput />
      </div>
    </div>
    <div class="row">
      <div class="col border">
        <FolderList />
      </div>
      <div class="col border">
        <FileList />
      </div>
    </div>
  </div>
</template>

<script>
import FolderList from "./components/FolderList.vue";
import FileList from "./components/FileList.vue";
import SearchInput from "./components/SearchInput.vue";

export default {
  name: "App",
  components: {
    FolderList,
    FileList,
    SearchInput,
  },
};
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
