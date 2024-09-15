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

    <div v-if="comments.length > 0">
      <div
        v-for="comment in displayedComments"
        :key="comment.id"
        class="card d-flex my-3"
        @mouseenter="comment.showEmojis = true"
        @mouseleave="comment.showEmojis = false"
      >
        <div class="card-header">
          <span class="float-start">
            <b><i class="fa-solid fa-user"></i> {{ comment.authorName }}</b>
          </span>
          <span class="float-end text-body-secondary">
            <small><i class="fa-solid fa-clock"> {{ formatDate(comment.createDate) }}</i></small>
          </span>
        </div>

        <div class="card-body text-start">
          <blockquote class="blockquote mb-0">
            <p>{{ comment.content }}</p>
          </blockquote>

          <div v-if="comment.showEmojis" class="emoji-picker-container">
            <span
              v-for="emoji in emojiList"
              :key="emoji"
              class="emoji"
              @click="addEmojiToComment(comment.id, emoji)"
            >
              {{ emoji }}
            </span>
          </div>

          <div class="comment-reactions" v-if="comment.reactions.length > 0">
            <span
              v-for="reaction in comment.reactions.split('')"
              :key="reaction"
              class="reaction"
            >
              {{ reaction }}
            </span>
          </div>

          <span
            class="delete-icon"
            @click="deleteComment(comment.id)"
            title="Yorumu sil"
          >
            <i class="fa-solid fa-times"></i>
          </span>
        </div>
      </div>

      <div v-if="comments.length < totalCommentsCount" class="text-center">
  <button @click="loadMoreComments" class="load-more-button">
    Daha fazla yorum yükle ({{ totalCommentsCount }})
  </button>
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
import moment from 'moment';

const store = useStore();

const selectedFile = computed(() => store.getters["file/getSelectedFile"]);
const selectedFileId = computed(() => selectedFile.value?.id);




const displayedCommentsCount = ref(3);

watch(selectedFileId, async (newFileId) => {
  if (newFileId) {
    try {
      await store.dispatch("comment/getLimitedCommentsByFileId", {
        fileId: newFileId,
        limit: displayedCommentsCount.value,
        offset: 0
      });
      await store.dispatch("comment/fetchTotalCommentsCount", newFileId);
    } catch (error) {
      console.error("Yorumlar yüklenirken bir hata oluştu:", error);
    }
  }
}, { immediate: true });

const comments = computed(() => store.getters["comment/comments"]);
const newCommentContent = ref("");
const authorName = ref("");

const fileId = computed(() => selectedFileId.value);

const totalCommentsCount = computed(() => store.getters['comment/totalCommentsCount']);

const displayedComments = computed(() => {
  return comments.value
    .filter(comment => comment.fileId === fileId.value)
    .slice(0, displayedCommentsCount.value);
});
const loadMoreComments = async () => {
  displayedCommentsCount.value += 3;
  try {
    await store.dispatch("comment/getLimitedCommentsByFileId", {
      fileId: fileId.value,
      limit: displayedCommentsCount.value,
      offset: 0
    });
  } catch (error) {
    console.error('Yorumlar yüklenirken bir hata oluştu:', error);
  }
};

const expandTextarea = (event) => {
  event.target.style.height = "150px";
};

const shrinkTextarea = (event) => {
  event.target.style.height = "50px";
};

const addComment = async () => {
  if (newCommentContent.value.trim()) {
    if (!fileId.value) {
      toast.error("Dosya seçilmedi.");
      return;
    }

    const commentModel = { 
      content: newCommentContent.value, 
      authorName: authorName.value, 
      fileId: fileId.value, 
      reactions: ""
    };

    try {
      await store.dispatch("comment/addComment", commentModel);
      toast.success("Yorum başarıyla eklendi.");
      newCommentContent.value = "";
      authorName.value = "";
      await store.dispatch("comment/getLimitedCommentsByFileId", { fileId: fileId.value, limit: displayedCommentsCount.value, offset: 0 });
    } catch (error) {
      toast.error("Yorum eklenirken bir hata oluştu.");
    }
  } else {
    toast.error("Yorum alanı boş olamaz.");
  }
};

const deleteComment = async (commentId) => {
  try {
    await store.dispatch('comment/deleteComment', commentId);
    toast.success('Yorum başarıyla silindi.');
    // Reload comments after deleting one
    await store.dispatch("comment/getLimitedCommentsByFileId", { fileId: fileId.value, limit: displayedCommentsCount.value, offset: 0 });
  } catch (error) {
    toast.error('Yorum silinirken bir hata oluştu.');
  }
};

const emojiList = ['😊', '😂', '❤️', '👍', '🎉'];

const addEmojiToComment = async (commentId, emoji) => {
  const comment = comments.value.find(c => c.id === commentId);
  if (comment) {
    const updatedReactions = comment.reactions ? `${comment.reactions}${emoji}` : emoji;

    try {
      await store.dispatch('comment/updateCommentReactions', { commentId, reactions: updatedReactions });
    } catch (error) {
      console.error('Emoji güncellenirken bir hata oluştu:', error);
    }
  }
};



const formatDate = (date) => {
  return moment(date).format('DD MM YYYY, HH:mm');
};
</script>



<style scoped>
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blockquote {
  margin: 0;
}

.delete-icon {
  cursor: pointer;
  color: #ff2600;
}

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
}

.submit-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.emoji-picker-container {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.emoji {
  cursor: pointer;
}

.reaction {
  display: inline-block;
  margin-right: 5px;
}

.load-more-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.load-more-button:hover {
  background-color: #0056b3;
}
</style>
