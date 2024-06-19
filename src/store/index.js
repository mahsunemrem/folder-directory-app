import { createStore } from 'vuex';

import fileModule from './modules/file/file';
import folderModule from './modules/folder/folder';

const store = createStore({
  modules: {
    file: fileModule,
    folder: folderModule
  }
});

export default store;
