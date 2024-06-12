<template>
  <div class="justify-start">
    <b>a/b/c/3</b>
  </div>
  <hr>
  <div v-html="selectedFile?.content">
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import {computed} from "vue";

const store = useStore();

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);

</script>

<style>

</style>