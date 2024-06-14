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
  <div style="margin-top: 10px">
    <input type="text" :value="path == '' ? '/' : '/' + path + '/'" /> &nbsp;
    <input type="text" v-model="fileName" placeholder="enter file name" />
  </div>
  <div style="margin-top: 10px">
    <input disabled :value="filePath" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import FolderComponent from "./FolderComponent.vue";

const store = useStore();

const folderTree = computed(() => store.getters["folder/getFolderTree"]);

const path = ref("");
const fileName = ref("");

const filePath = computed(() => {
  if (path.value == "") return "";

  return "/" + path.value + "/" + fileName.value;
});
</script>

<style>
</style>