import * as types from './mutation-types';
import commentService from '@/services/entities/commentService';

const comment = {
  namespaced: true,
  state: {
    // Initialize as an empty array to avoid "not iterable" errors
    commentsByFileId: [],
    totalCommentsCount: 0,

  },
  mutations: {
    [types.SET_COMMENTS_BY_FILE_ID](state, comments) {
      state.commentsByFileId = comments;
      state.commentCount = comments.length
    },
    [types.SET_LIMITED_COMMENTS_BY_FILE_ID](state, comments) {
      state.commentsByFileId = comments;
 
    },
    [types.ADD_COMMENT](state, comment) {
      state.commentsByFileId.push(comment);
    },
    [types.DELETE_COMMENT](state, commentId) {
      state.commentsByFileId = state.commentsByFileId.filter(comment => comment.id !== commentId);
    },
    [types.UPDATE_COMMENT_REACTIONS](state, { commentId, reactions }) {
      const comment = state.commentsByFileId.find(c => c.id === commentId);
      if (comment) {
        comment.reactions = reactions;
      }
    },
    [types.SET_TOTAL_COMMENTS_COUNT](state, count) {
      state.totalCommentsCount = count; // Mutation to set total comments count
    }
  },
  actions: {
    async getLimitedCommentsByFileId({ commit }, { fileId, limit, offset }) {
      try {
        const comments = await commentService.getLimitedCommentsByFileId(fileId, limit, offset);
        commit(types.SET_LIMITED_COMMENTS_BY_FILE_ID, comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },


    async addComment({ dispatch }, commentModel) {
      try {
        await commentService.addComment(commentModel);
        await dispatch('getCommentsByFileId', { fileId: commentModel.fileId, limit: 10, offset: 0 });
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    },

    async deleteComment({ commit }, commentId) {
      try {
        await commentService.deleteComment(commentId);
        commit(types.DELETE_COMMENT, commentId);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    },

    async updateCommentReactions({ commit }, { commentId, reactions }) {
      try {
        await commentService.updateCommentReactions(commentId, reactions);
        commit(types.UPDATE_COMMENT_REACTIONS, { commentId, reactions });
      } catch (error) {
        console.error("Error updating comment reactions:", error);
      }
    },
    async fetchTotalCommentsCount({ commit }, fileId) {
      try {
        console.log('Fetching total comments count for fileId:', fileId);
        const count = await commentService.fetchTotalCommentsCount(fileId);
        console.log('Received count:', count);
        commit('SET_TOTAL_COMMENTS_COUNT', count);
      } catch (error) {
        console.error('Error fetching total comments count:', error);
      }
    }
  },
  getters: {
    comments: (state) => state.commentsByFileId || [],
    totalCommentsCount: (state) => state.totalCommentsCount || 0,
  },
};

export default comment;
