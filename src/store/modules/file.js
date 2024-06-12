import fileList from '../../utils/files'

const fileModule = {
  namespaced: true,
  state: {
    files: [],
    selectedFile: null
  },
  mutations: {
    setFiles(state, files) {
      state.files = files;
    },
    setSelectedFile(state, file) {
      state.selectedFile = file;
    }
  },
  actions: {
    loadFiles({ commit }) {
      commit('setFiles', fileList)
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
      console.log("girdi")
      if (!folderId) {
        return [];
      }

      return state.files.filter(x => x.folderId == folderId)
    }
  }
};

export default fileModule;