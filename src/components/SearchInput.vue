<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Arama yapın"
      aria-label="Search..."
      aria-describedby="basic-addon2"
      v-model="inputValue"
      @keyup="setSelectedFile(null)"
    />
    <span class="input-group-text" id="basic-addon2">
      <i class="fa-brands fa-searchengin"></i>
    </span>
  </div>
  <hr />
  <ul class="list-group">
    <button
      v-for="file in files"
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
  <hr />

</template>

<script setup>
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

const inputValue = ref("");

const store = useStore();

onMounted(async () => {
  await store.dispatch("file/loadFiles");
});

const files = computed(() => store.getters["file/getFiles"](inputValue.value));

const setSelectedFile = (selectedFile) =>
  store.commit("file/setSelectedFile", selectedFile);

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
</script>


<style>
</style>