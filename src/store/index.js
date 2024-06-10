// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      selectedFolder: '-1'
    };
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
    getSelectedFolder: (state) => {
      return state.selectedFolder;
    }
  }
});

export default store;
