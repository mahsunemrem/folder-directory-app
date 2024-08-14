import { createStore } from 'vuex';

import fileModule from './modules/file/file';
import folderModule from './modules/folder/folder';
import commentModule from './modules/comment/comment';

const store = createStore({
  modules: {
    file: fileModule,
    folder: folderModule,
    comment: commentModule
  }
});

export default store;
