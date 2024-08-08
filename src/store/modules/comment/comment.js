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
    [types.ADD_COMMENT](state, comment) {
      if (state.commentsByFileId) {
        state.commentsByFileId.push(comment);
      } else {
        state.commentsByFileId = [comment];
      }
    },
  },
  actions: {
    async getCommentsByFileId({ commit }, fileId) {
      const comments = await commentService.getCommentsByFileId(fileId);
      commit(types.SET_COMMENTS_BY_FILE_ID, comments);
    },
    async addComment({dispatch} , commentModel) {
      console.log(commentModel)
      await commentService.addComment( commentModel);

      await dispatch('getCommentsByFileId', commentModel.fileId);
    },
  },
  getters: {
    comments: (state) => state.commentsByFileId,
  },
};

export default comment;
