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
    },
    [types.ADD_FILE](state, file) { 
      state.filesByFolderId.push(file);
    },
  },
  actions: {
    async getFilesByFolderId({ commit }, folderId) {
      var files = await fileService.getFilesByFolderId(folderId);

      commit(types.SET_FILES_BY_FOLDER_ID, files)
    },
    async getFileById({ commit }, fileId) {
      var file = await fileService.getById(fileId);
      commit(types.SET_SELECTED_FILE, file)
    },
    async addFile(_, fileModel) { // New action
      await fileService.addFile(fileModel);
    },
    async fileDelete({ getters, dispatch }, fileId) {
      await fileService.fileDelete(fileId);

      var selectedFolderId = getters["folder/getSelectedFolder"];
      console.log(selectedFolderId)
      // burada dosya silindikten sonra, seçili olan klasörün dosyalarını tekrardan çağır. yani getSelectedFolder getters'i ile seçili olan klasörün id'sini al ve yukarıdaki get filesbyFolderId actionuına göndererek o actionu tetikle. otomatik dosya listesi güncellenenecek. Çünkü arrayde senin sildiğin dosyayı kaldırmak kolay. Ancak aynı anda başka kullanıcı işlem yaptıysa bunu görmen lazım!
      await dispatch('getFilesByFolderId', selectedFolderId)
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