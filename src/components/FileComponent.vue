<template>
  <div class="container">
    <form class="mt-3">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Folder</label
            >
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Contet</label>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      </div>
      <button type="submit" class="btn btn-primary float-end">Submit</button>
    </form>
  </div>
</template>

<script>

import CKEditor from '@ckeditor/ckeditor5-vue';
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
    Undo
  } from 'ckeditor5';

  import 'ckeditor5/ckeditor5.css';

  export default {
    name: 'app',
    components: {
      ckeditor: CKEditor.component
    },
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', '|',
            'link', 'insertTable', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
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
            Undo
          ],
        }
      };
    }
  }
</script>

<style>
</style>