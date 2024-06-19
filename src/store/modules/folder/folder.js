import buildTree from "../../../utils/buildTree.js";
import folders from "../../../utils/folders.js";
import { SET_SELECTED_FOLDER } from './mutation-types'

const folderModule = {
  namespaced: true,
  state: {
    selectedFolder: '-1',
    fodlerTree: buildTree(folders)
  },
  mutations: {
    [SET_SELECTED_FOLDER](state, newValue) {
      state.selectedFolder = newValue;
    }
  },
  actions: {
    updateSelectedFolder({ commit }, newValue) {
      commit(SET_SELECTED_FOLDER, newValue);
    }
  },
  getters: {
    getSelectedFolder: (state) => state.selectedFolder,
    getFolderTree: (state) => state.fodlerTree
  }
};

export default folderModule;
