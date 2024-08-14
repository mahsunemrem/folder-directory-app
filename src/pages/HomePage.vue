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
      <FileViewer />
    </div>
</template>

<script>
import FolderList from "@/components/FolderList.vue";
import FileList from "@/components/FileList.vue";
import FileViewer from "@/components/FileViewer.vue";


export default {
    components: {
    FolderList,
    FileList,
    FileViewer,
  },
}
</script>

<style>

</style>