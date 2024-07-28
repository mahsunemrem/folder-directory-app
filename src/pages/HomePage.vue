<template>
  <div class="row">
      <div class="col border">
        <FolderList />
      </div>
      <div class="col border">
        <FileList />
      </div>
    </div>
    <div class="row">
      <FileComponent />
    </div>
</template>

<script>
import FolderList from "@/components/FolderList.vue";
import FileList from "@/components/FileList.vue";
import FileComponent from "@/components/FileViewer.vue";


export default {
    components: {
    FolderList,
    FileList,
    FileComponent,
  },
}
</script>

<style>

</style>