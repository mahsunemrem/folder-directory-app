import { createStore } from 'vuex';

import fileModule from './modules/file';
import folderModule from './modules/folder';

const store = createStore({
  modules: {
    file: fileModule,
    folder: folderModule
  }
});

export default store;
