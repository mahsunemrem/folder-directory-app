import buildTree from "../../../utils/buildTree.js";
import folderService from '@/services/entities/folderService'
import { SET_SELECTED_FOLDER, SET_FOLDERS } from './mutation-types'

const folderModule = {
  namespaced: true,
  state: {
    selectedFolder: '-1',
    folderTree: []
  },
  mutations: {
    [SET_SELECTED_FOLDER](state, selectedFolder) {
      state.selectedFolder = selectedFolder;
    },
    [SET_FOLDERS](state, folders) {
      state.folderTree = folders;
    }
  },
  actions: {
    updateSelectedFolder({ commit }, newValue) {
      commit(SET_SELECTED_FOLDER, newValue);
    },
    async loadFolders({commit}){

      var folders = await folderService.getAll();
      var folderTree = buildTree(folders)

      commit(SET_FOLDERS, folderTree);
    },
   
    
  },
  getters: {
    getSelectedFolder: (state) => state.selectedFolder,
    getFolderTree: (state) => state.folderTree
}};

export default folderModule;
