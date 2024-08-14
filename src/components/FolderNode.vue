<template>
    <li>
      <div @click="toggle" class="folder-item">
        {{ folder.name }}
      </div>
      <ul v-if="isOpen" class="subfolder-list">
        <folder-node
          v-for="subfolder in folder.children"
          :key="subfolder.id"
          :folder="subfolder"
          @select="$emit('select', $event)"
        ></folder-node>
      </ul>
    </li>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'FolderNode',
    props: {
      folder: {
        type: Object,
        required: true
      }
    },
    setup(props, { emit }) {
      const isOpen = ref(false);
  
      const toggle = () => {
        if (props.folder.children && props.folder.children.length) {
          isOpen.value = !isOpen.value;
        } else {
          emit('select', props.folder);
        }
      };
  
      return {
        isOpen,
        toggle
      };
    }
  };
  </script>
  
  <style scoped>
  .folder-item {
    cursor: pointer;
    padding: 5px;
  }
  
  .subfolder-list {
    list-style: none;
    padding-left: 20px;
  }
  
  .folder-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  