<template>
  <div>
    <div class="text-start">
      <b>{{ selectedFile?.name }}</b>
    </div>

    <div class="comment-form">
      <input
        v-model="authorName"
        placeholder="İsminiz"
        class="form-input author-name"
      />
      <textarea
        v-model="newCommentContent"
        placeholder="Yorum Yapın"
        class="form-input comment-content"
        @focus="expandTextarea"
        @blur="shrinkTextarea"
      />
      <button @click="addComment" class="submit-button">Yorum Ekle</button>
    </div>

    <div v-if="comments && comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="card d-flex my-3">
        <div class="card-header">
          <span class="float-start">
            <b><i class="fa-solid fa-user"></i> {{ comment.authorName }}</b>
          </span>
          <span class="float-end text-body-secondary">
            <small><i class="fa-solid fa-clock  "> {{ formatDate(comment.createDate )}}</i> </small>
          </span>
        </div>
        <div class="card-body text-start">
          <blockquote class="blockquote mb-0">
            <p>{{ comment.content }}</p>
          </blockquote>
        </div>
      </div>
    </div>
    <div v-else>
      Henüz yorum yok.
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import toast from '@/plugins/sweetalert';

const store = useStore();

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
const selectedFileId = computed(() => selectedFile.value?.id);

watch(selectedFileId, async (newFileId) => {
  if (newFileId) {
    await store.dispatch("comment/getCommentsByFileId", newFileId);
  }
}, { immediate: true });

const comments = computed(() => store.getters["comment/comments"]);
const newCommentContent = ref("");
const authorName = ref("");
const fileId = ref(selectedFileId);

const expandTextarea = (event) => {
  event.target.style.height = "150px";
};

const shrinkTextarea = (event) => {
  event.target.style.height = "50px";
};

const addComment = async () => {
  if (newCommentContent.value.trim()) {
    await store.dispatch("comment/addComment", { 
      commentData: { content: newCommentContent.value, authorName: authorName.value , fileId:fileId.value }
    });
    newCommentContent.value = "";
    authorName.value = "";
  } else {
    toast.error("Yorum alanı boş olamaz.");
  }
};

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};
</script>

<style scoped>
.comment-form {
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.comment-content {
  min-height: 50px;
  resize: none;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
