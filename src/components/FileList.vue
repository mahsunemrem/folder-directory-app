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
import { computed, watch  } from 'vue';


const store = useStore();

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
const selectedFolder = computed(() => store.getters["folder/getSelectedFolder"]);

watch(selectedFolder, async (newFolderId) => {
  await store.dispatch("file/getFilesByFolderId", newFolderId);
})

const filteredFiles = computed(() => store.getters["file/getFilesByFolderId"]);



const setSelectedFile = async (selectedFile) => await store.dispatch("file/getFileById", selectedFile.id);


</script>

<style>
</style>