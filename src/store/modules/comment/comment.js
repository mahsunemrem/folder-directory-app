import * as types from './mutation-types';
import commentService from '@/services/entities/commentService';

const comment = {
  namespaced: true,
  state: {
    commentsByFileId: [],
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
    getCommentsByFileId: (state) => (fileId) => state.commentsByFileId[fileId] || [],
  },
};

 export default comment;
// import * as types from './mutation-types';
// import commentService from '@/services/entities/commentService';

// const commentModule = {
//   namespaced: true,
//   state: {
//     comments: []
//   },
//   mutations: {
//     [types.SET_COMMENTS](state, comments) {
//       state.comments = comments;
//     }
//   },
//   actions: {
//     async fetchComments({ commit }, fileId) {
//       try {
//         const comments = await commentService.getCommentsByFileId(fileId);
//         commit(types.SET_COMMENTS, comments);
//       } catch (error) {
//         console.error("Failed to fetch comments:", error);
//       }
//     }
//   },
//   getters: {
//     allComments: (state) => state.comments
//   }
// };

// export default commentModule;