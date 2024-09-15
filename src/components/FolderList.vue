<template>
  <h2 @click="path = ''" class="cursor">Root</h2>

  <div>
    <div v-for="folder in folderTree" :key="folder.id" class="col-md-8">
      <FolderComponent
        @publish-path="path = $event"
        :folder="folder"
        indent="0"
      />
      <div class="col-md-8"></div>
    </div>
  </div>

  <!-- Dosya yolu ve dosya ismi inputları -->
  <div style="margin-top: 10px">
    <input v-if="path != ''" type="text" :value="path == '' ? '/' : '/' + path + '/'" /> &nbsp;
    <input type="text" v-model="fileName" placeholder="enter file name" />
  </div>

  <!-- Dosya yolunun gösterimi, sadece filePath dolu ise göster -->
  <div v-if="filePath" style="margin-top: 10px">
    <input disabled :value="filePath" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import FolderComponent from "./FolderComponent.vue";

const store = useStore();

// Folder ağacı Vuex'ten yüklendiğinde gösterilecek
onMounted(async () => {
  await store.dispatch("folder/loadFolders"); 
});

// Folder ağacını Vuex'ten alıyoruz
const folderTree = computed(() => store.getters["folder/getFolderTree"]);

const path = ref("");    // Seçili klasör yolu
const fileName = ref(""); // Dosya adı

// Dosya yolu, boş olduğunda gizlenecek
const filePath = computed(() => {
  if (!path.value || path.value === "") return "";  // Eğer path boşsa boş string döner
  const file = fileName.value ? fileName.value : ""; // Dosya adı boş mu kontrol eder
  return file ? `/${path.value}/${file}` : `/${path.value}`; // Dosya adı varsa tam yolu göster
});
</script>

<style>
/* İsteğe bağlı stil düzenlemeleri burada yapılabilir */
</style>
