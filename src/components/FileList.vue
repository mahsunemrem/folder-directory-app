<template>
  <h2>Files</h2>
  <div>
    <ul class="list-group">
      <button
        v-for="file in filteredFiles"
        :key="file.id"
        @click="setSelectedFile(file)"
        :class="{ active: selectedFile?.id == file.id }"
        type="button"
        class="list-group-item list-group-item-action"
        aria-current="true"
      >
        <i class="fa-solid fa-file-lines"></i> {{ file.name }}
      </button>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from 'vue';


const store = useStore();

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
const getSelectedFolder = computed(() => store.getters["folder/getSelectedFolder"]);

const filteredFiles = computed(() => store.getters["file/getFilesWithFolderId"](getSelectedFolder.value));

const setSelectedFile = (selectedFile) =>
  store.commit("file/setSelectedFile", selectedFile);

</script>



<style>
</style>