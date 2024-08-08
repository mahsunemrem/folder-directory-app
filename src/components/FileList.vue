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
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        aria-current="true"
      >
        <span>
          <i class="fa-solid fa-file-lines"></i> {{ file.name }}
        </span>
        <span
          class="delete-icon"
          @click="fileDelete(file.id)" 
          title="Dosyayı sil"
        >
          <i class="fa-solid fa-times"></i>
        </span>
      </button>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, watch } from 'vue';

const store = useStore();

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
const selectedFolder = computed(() => store.getters["folder/getSelectedFolder"]);

watch(selectedFolder, async (newFolderId) => {
  await store.dispatch("file/getFilesByFolderId", newFolderId);
})

const filteredFiles = computed(() => store.getters["file/getFilesByFolderId"]);

const setSelectedFile = async (selectedFile) => await store.dispatch("file/getFileById", selectedFile.id);


const fileDelete = async (fileId) => {
  console.log('Deleting file with ID:', fileId);
  await store.dispatch("file/fileDelete", fileId);
 
  console.log("File deleted:", fileId);
}
</script>

<style>
</style>
