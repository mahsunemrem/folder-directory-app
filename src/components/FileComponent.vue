<template>
  <div class="container">
    <form class="mt-3" @submit.prevent="submitFile">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="name" required />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label class="form-label">Folder</label>
            <select class="form-select" v-model="folderId" required>
              <option
                v-for="folder in folders"
                :key="folder.id"
                :value="folder.id"
              >
                {{ folder.name }}
              </option>
            </select>
            <p>Selected Folder ID: {{ folderId }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mb-3">
          <label class="form-label">İçerik</label>
          <ckeditor v-model="content" :editor="editor" :config="editorConfig" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary float-end">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import CKEditor from "@ckeditor/ckeditor5-vue";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

export default {
  name: "FileUpload",
  setup() {
    const store = useStore();

    const name = ref("");
    const content = ref("buraya içeriği giriniz!");
    const folders = ref([]);
    const folderId = ref(null);

    const editor = ref(ClassicEditor);
    const editorConfig = ref({
      toolbar: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "insertTable",
        "|",
        "bulletedList",
        "numberedList",
        "indent",
        "outdent",
      ],
      plugins: [
        Bold,
        Essentials,
        Heading,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        MediaEmbed,
        Paragraph,
        Table,
        Undo,
      ],
    });

    const submitFile = async () => {
      try {
        const fileModel = {
          name: name.value,
          folderId: folderId.value,
          content: content.value,
        };

        await store.dispatch("file/addFile", fileModel);
        name.value = "";
        folderId.value = null;
        content.value = "";
      } catch (error) {
        console.error("File submission failed", error);
      }
    };

    const fetchFolders = async () => {
      try {
        await store.dispatch("folder/loadFolders");
        folders.value = store.getters["folder/getFolderTree"];
      } catch (error) {
        console.error("Failed to fetch folders", error);
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
      editor,
      editorConfig,
      submitFile,
    };
  },
  components: {
    ckeditor: CKEditor.component,
  },
};
</script>


<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>