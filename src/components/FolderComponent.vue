<template>
  {{ "&nbsp;".repeat(indent) }}
  <span @click="openFolder" class="cursor">
    <template v-if="show">
      <i class="fa-solid fa-chevron-down"></i> &nbsp;
      <i class="fa-solid fa-folder-open"></i>
    </template>

    <template v-else>
      <i class="fa-solid fa-chevron-right"></i> &nbsp;
      <i class="fa-solid fa-folder"></i>
    </template>
    &nbsp;
    <b>{{ folder.name }}</b>
  </span>
  <br />
  <div v-show="show">
    <template v-for="childFolder in folder.children" :key="childFolder.id">
      <ChildNode @publish-path="publishPathToParent" :folder="childFolder" :indent="Number(indent) + 12" />
    </template>
  </div>
</template>

<script>
export default {
  name: "ChildNode",
  data: function () {
    return {
      show: false,
    };
  },
  methods: {
    openFolder(){
      this.show = !this.show;

      var self = this;
      this.$emit('publishPath', self.folder.name)
    },
    publishPathToParent(path){
      var self = this;
      this.$emit('publishPath', self.folder.name+"/"+path)
    }
  },
  props: {
    folder: Object,
    indent: Number,
  },
};
</script>

<style>
.cursor:hover {
  cursor: pointer;
}
</style>