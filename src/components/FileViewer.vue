<template>
  <div>   
      <!-- Dosya yolunun gösterimi -->
      <div v-if="filePath !== '/'" style="margin-top: 10px">
        <input disabled :value="filePath" />
      </div>

    <!-- File Details Section -->
    <div v-if="selectedFile" class="p-3">
      <div class="d-flex justify-content-start">
        <b><i class="fa-solid fa-house"></i> {{ path }}/{{ selectedFile?.name }}</b>
      </div>
      <hr />
      <div v-if="loading" class="d-flex justify-content-center p-5">
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else class="container">
        <div v-html="selectedFile?.content"></div>
        <hr>
        <FileComment />
      </div>    
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import FileComment from "@/components/FileComment.vue";

// Initialize Vuex store
const store = useStore();

// Get folder path and selected file from Vuex store
const path = computed(() => store.getters["folder/getPath"]);
const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
const loading = ref(false);

// File name and path computations
const fileName = ref("");
const filePath = computed(() => {
  if (!path.value || path.value === "") return "/";  // Eğer yol boşsa root "/" döner.
  
  const file = fileName.value ? fileName.value : "";  // Boş dosya adını kontrol et.
  
  // Dosya adı varsa tam dosya yolunu döndür, yoksa sadece klasör yolunu döndür.
  return file ? `/${path.value}/${file}` : `/${path.value}/`;
});

</script>

<style>
/* Your custom styles here */
</style>
