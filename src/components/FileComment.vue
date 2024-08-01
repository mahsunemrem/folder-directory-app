<template>
  <div>
    <div class="text-start">
      <b>{{ selectedFile }}</b>
    </div>
  
      <div v-for="comment in comments" :key="comment.id" class="card d-flex my-3">
        <div class="card-header">
          <span class="float-start">
            <b><i class="fa-solid fa-user"></i> {{ comment.authorName }}</b>
          </span>
          <span class="float-end text-body-secondary">
            <small><i class="fa-solid fa-clock"></i> </small>
          </span>
        </div>
        <div class="card-body text-start">
          <blockquote class="blockquote mb-0">
            <p>{{ comment.content }}</p>
          </blockquote>
        </div>
      </div>
    
  
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, watch } from "vue";


const store = useStore();

const selectedFileId = computed(() => store.getters["file/getSelectedFile"]?.id);

watch(selectedFileId , async (newFileId) => {
  await store.dispatch("comment/getCommentsByFileId", newFileId);
},  { immediate: true });

const comments = computed(() => store.getters["comment/comments"]);


</script>
