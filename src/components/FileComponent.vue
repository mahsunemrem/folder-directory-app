<template>
  <div class="container">
    <form class="mt-3" @submit.prevent="submitFile">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="name" required />
          </div>
          <div class="mb-3">
            <label class="form-label">İçerik</label>
            <input type="text" class="form-control" v-model="content" required />
          </div>
        </div>
      
        <div class="col">
          <div class="mb-3">
            <label class="form-label">Folder</label>
            <select class="form-select" v-model="folderId" required>
              <option v-for="folder in folders" :key="folder.id" :value="folder.id">
  {{ folder.name }}
</option>
            </select>
            <p>Selected Folder ID: {{ folderId }}</p>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary float-end">Submit</button>
    </form>
  </div>
</template>

<script>
// import CKEditor from '@ckeditor/ckeditor5-vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ClassicEditor, Bold, Essentials, Heading, Indent, IndentBlock, Italic, Link, List, MediaEmbed, Paragraph, Table, Undo } from 'ckeditor5';

export default {
  name: 'FileUpload',
  setup() {
    const store = useStore();

    const name = ref('');
    const content = ref('');
    const folders = ref([]);
    const folderId = ref(null);
    const editorData = ref('');
    const editor = ClassicEditor;
    const editorConfig = {
      toolbar: [
        'undo', 'redo', '|',
        'heading', '|', 'bold', 'italic', '|',
        'link', 'insertTable', '|',
        'bulletedList', 'numberedList', 'indent', 'outdent',
      ],
      plugins: [
        Bold, Essentials, Heading, Indent, IndentBlock, Italic, Link, List, MediaEmbed, Paragraph, Table, Undo,
      ],
    };

    const submitFile = async () => {
      try {
        const fileData = {
          name: name.value,
          folderId: folderId.value,
          content: content.value
        };

        await store.dispatch('file/addFile', fileData);
        name.value = '';
        folderId.value = null;
        content.value = '';
      } catch (error) {
        console.error('File submission failed', error);
      }
    };

    const fetchFolders = async () => {
  try {
    await store.dispatch("folder/loadFolders");
    folders.value = store.getters["folder/getFolderTree"];
  } catch (error) {
    console.error('Failed to fetch folders', error);
  }
};



    onMounted(() => {
      fetchFolders();
    });

    return {
      name,
      content,
      folderId,
      folders,
      editorData,
      editor,
      editorConfig,
      submitFile,
    };
  },
};
</script>
