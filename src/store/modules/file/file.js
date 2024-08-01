import * as types from './mutation-types'
import fileService from '@/services/entities/fileService'

const fileModule = {
  namespaced: true,
  state: {
    filesByFolderId: [],
    selectedFile: null
  },
  mutations: {
    [types.SET_FILES_BY_FOLDER_ID](state, files) {
      state.filesByFolderId = files;
    },
    [types.SET_SELECTED_FILE](state, file) {
      state.selectedFile = file;
    }
  },
  actions: {
    async getFilesByFolderId({ commit }, folderId) {
      var files = await fileService.getFilesByFolderId(folderId);

      commit(types.SET_FILES_BY_FOLDER_ID, files)
    },
    async getFileById({ commit }, fileId) {
      var file = await fileService.getById(fileId);
      commit(types.SET_SELECTED_FILE, file)
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
    getFilesByFolderId: (state) => state.filesByFolderId
  }
};

export default fileModule;