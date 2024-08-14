<template>
  <div class="container">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="loading-screen">
      <div class="spinner"></div>
    </div>

    <!-- Main Content -->
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
              <option v-for="folder in flattenedFolders" :key="folder.id" :value="folder.id">
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
import toast from '@/plugins/sweetalert';
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
import { useRouter } from 'vue-router';
import "@/loading/loading.css";

export default {
  name: "FileUpload",
  setup() {
    const store = useStore();
    const router = useRouter();

    const name = ref("");
    const content = ref("buraya içeriği giriniz!");
    const folders = ref([]);
    const flattenedFolders = ref([]);
    const folderId = ref(null);
    const isLoading = ref(false);

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
      isLoading.value = true;

      setTimeout(async () => {
        try {
          const fileModel = {
            name: name.value,
            folderId: folderId.value,
            content: content.value,
          };

          await store.dispatch("file/addFile", fileModel);
          toast.success("Dosya başarıyla eklendi.");

          name.value = "";
          folderId.value = null;
          content.value = "";

          router.push("/");
        } catch (error) {
          console.error("File submission failed", error);
          toast.error("Dosya eklenemedi.");
        } finally {
          isLoading.value = false;
        }
      }, 1000);
    };

    const fetchFolders = async () => {
      try {
        await store.dispatch("folder/loadFolders");
        folders.value = store.getters["folder/getFolderTree"];
        flattenedFolders.value = flattenFolders(folders.value);
      } catch (error) {
        console.error("Failed to fetch folders", error);
      }
    };

    const flattenFolders = (folders, depth = 0) => {
      let flatFolders = [];
      folders.forEach(folder => {
        flatFolders.push({
          id: folder.id,
          name: "—".repeat(depth) + " " + folder.name,
        });
        if (folder.children && folder.children.length > 0) {
          flatFolders = flatFolders.concat(flattenFolders(folder.children, depth + 1));
        }
      });
      return flatFolders;
    };

    onMounted(() => {
      fetchFolders();
    });

    return {
      name,
      content,
      folderId,
      flattenedFolders,
      editor,
      editorConfig,
      submitFile,
      isLoading,
    };
  },
  components: {
    ckeditor: CKEditor.component,
  },
};
</script>


<style>


/* CKEditor min-height */
.ck-editor__editable {
  min-height: 500px;
}
</style>