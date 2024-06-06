<template>
  <h1 @click="path =''" class="cursor">Root</h1>

  <div>
    <div v-for="folder in folderTree" :key="folder.id" class="col-md-8">
    <FolderComponent 
    @publish-path="path = $event"     
      :folder="folder"
      indent=0
    />
    <div class="col-md-8">

    </div>
  </div>
  </div>
  <div style="margin-top:10px">
    <input type="text" :value="path == '' ? '/' : '/'+path+'/'"> &nbsp;
    <input type="text" v-model="fileName" placeholder="enter file name">
  </div>
  <div style="margin-top:10px">
    <input disabled :value="filePath">
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import FolderComponent from "./FolderComponent.vue";
import folders from "../utils/root.js";
import buildTree from "../utils/buildTree.js";

export default {
  setup(){
    const folderTree = ref(buildTree(folders));
    const path = ref("");
    const fileName = ref("");

    const filePath = computed(() => {
      if(path.value == "")
        return "";

      return '/'+path.value+'/'+fileName.value;
    });

  return{
    folderTree,
    path,
    filePath,
    fileName
  }
  },
  components: {
    FolderComponent,
  },
};
</script>

<style>
</style>