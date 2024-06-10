<template>
  <h2>Files</h2>
  <div>
    <ul class="list-group">
      <li v-for="file in filteredFiles" :key="file.id" class="list-group-item"><i class="fa-solid fa-file-lines"></i> {{ file.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import files from "../utils/files.js";

export default {
  data: function () {
    return {
      files,
    };
  },
  computed:{
    filteredFiles(){
        return this.files.filter(x => x.folderId == this.getSelectedFolder);
    },
    ...mapGetters(["getSelectedFolder"])
  }
};
</script>

<style>
</style>