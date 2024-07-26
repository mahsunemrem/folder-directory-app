import * as types from './mutation-types'
import file from '@/services/entities/file'

const fileModule = {
  namespaced: true,
  state: {
    files: [],
    selectedFile: null
  },
  mutations: {
    [types.SET_FILES](state, files) {
      state.files = files;
    },
    [types.SET_SELECTED_FILES](state, file) {
      state.selectedFile = file;
    }
  },
  actions: {
    async loadFiles({ commit }) {
      var files = await file.getAll();
      commit(types.SET_FILES, files)
    }
  },
  getters: {
    getFiles: (state) => (fileName) => {
      if (!fileName) {
        return [];
      }

      return state.files.filter(x => x.name.includes(fileName));
    },
    getSelectedFile: (state) => state.selectedFile,
    getFilesWithFolderId: (state) => (folderId) => {
      if (!folderId) {
        return [];
      }

      return state.files.filter(x => x.folderId == folderId)
    }
  }
};

export default fileModule;