import buildTree from "../../utils/buildTree.js";
import folders from "../../utils/folders.js";

const folderModule = {
  namespaced: true,
  state: {
    selectedFolder: '-1',
    fodlerTree:buildTree(folders)
  },
  mutations: {
    setSelectedFolder(state, newValue) {
      state.selectedFolder = newValue;
    }
  },
  actions: {
    updateSelectedFolder({ commit }, newValue) {
      commit('setSelectedFolder', newValue);
    }
  },
  getters: {
    getSelectedFolder: (state) => state.selectedFolder,
    getFolderTree: (state) => state.fodlerTree
  }
};

export default folderModule;
