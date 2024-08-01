import * as types from './mutation-types';
import commentService from '@/services/entities/commentService';

const comment = {
  namespaced: true,
  state: {
    commentsByFileId: null,
  },
  mutations: {
    [types.SET_COMMENTS_BY_FILE_ID](state, comments) {
      state.commentsByFileId = comments;
    },
  },
  actions: {
    async getCommentsByFileId({ commit }, fileId) {
      const comments = await commentService.getCommentsByFileId(fileId);
      commit(types.SET_COMMENTS_BY_FILE_ID, comments);
    },
  },
  getters: {
    comments: (state) => state.commentsByFileId,
  },
};

 export default comment;