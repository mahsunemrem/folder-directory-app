<template>
  <div class="p-3" v-if="selectedFile != null">
    <div class="d-flex justify-content-start">
      <b><i class="fa-solid fa-house"></i> a/b/c/3</b>
    </div>
    <hr />
    <div v-if="loading" class="d-flex justify-content-center p-5">
      <div class="spinner-grow  text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="container">
      <div v-html="selectedFile?.content">

      </div>
      <hr>
      <FileComment />
    </div>    
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import FileComment from "@/components/FileComment.vue";

const store = useStore();

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
console.log("selectedFile.value")
console.log(selectedFile.value);
const loading = ref(false);

// watch(selectedFile, () => {
//   loading.value = true;
//   setTimeout(() => {
//     loading.value = false;
//   }, 1000); // 1 saniye bekleme süresi
// });
</script>

<style>
</style>