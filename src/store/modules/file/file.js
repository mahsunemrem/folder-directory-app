import fileList from '../../../utils/files'
import * as types from './mutation-types'

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
    loadFiles({ commit }) {
      commit(types.SET_FILES, fileList)
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