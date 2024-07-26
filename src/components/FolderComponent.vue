<template>
  {{ "&nbsp;".repeat(indent) }}
  <span :class="{ cursor: true, active: folder.id == getSelectedFolder }">
    <span v-if="show">
      <i @click="openFolder(true)" class="fa-solid fa-chevron-down"></i> &nbsp;
    </span>
    <span v-else>
      <i @click="openFolder(true)" class="fa-solid fa-chevron-right"></i> &nbsp;
    </span>
    &nbsp;
    <span @click="openFolder(false)"
      ><i v-if="show" class="fa-solid fa-folder-open"></i>
      <i v-else class="fa-solid fa-folder-open"></i>
      <b>{{ folder.name }}</b></span
    >
  </span>
  <br />
  <div v-show="show">
    <template v-for="childFolder in folder.children" :key="childFolder.id">
      <ChildNode
        @publish-path="publishPathToParent"
        :folder="childFolder"
        :indent="Number(indent) + 12"
      />
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
  computed: {
    getSelectedFolder() {
      return this.$store.getters["folder/getSelectedFolder"];
    },
  },
  methods: {
    openFolder(showOption) {
      if (showOption == false && this.show == false) {
        this.show = !this.show;
      } else if (showOption == true) {
        this.show = !this.show;
      }

      var self = this;
      this.$emit("publishPath", self.folder.name);

      this.$store.commit("folder/setSelectedFolder", self.folder.id);
    },
    publishPathToParent(path) {
      var self = this;
      this.$emit("publishPath", self.folder.name + "/" + path);
    },
  },
  props: {
    folder: Object,
    indent: Number,
  }
};
</script>

<style>
.cursor:hover {
  cursor: pointer;
}

.active {
  background-color: rgb(0, 102, 255);
}
</style>