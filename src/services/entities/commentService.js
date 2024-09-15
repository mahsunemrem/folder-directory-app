import axios from '@/services/api';
import toast from '@/plugins/sweetalert';

export default {
  async getLimitedCommentsByFileId(fileId, limit = 3, offset = 0) {
    try {
      const response = await axios.get(`/files/${fileId}/comments`, {
        params: { limit, offset }
      });
      
      return response.data;
      
    } catch (error) {
      toast.error("Bir hata oluştu", error.message);
      return [];
    }
  },


  async addComment(commentModel) {
    try {
      const response = await axios.post(`/comments`, commentModel);
      toast.success("Yorum eklendi.");
      return response.data;
    } catch (error) {
      toast.error("Yorum eklenemedi", error.message);
      throw error; // Re-throw error to be handled in action
    }
  },

  async deleteComment(commentId) {
    try {
      const response = await axios.delete(`/comments/${commentId}`);
      toast.success("Yorum silindi.");
      return response.data;
    } catch (error) {
      toast.error("Yorum silinirken bir hata oluştu", error.message);
      throw error;
    }
  },

  async updateCommentReactions(commentId, reactions) {
    try {
      const response = await axios.put(`/comments/${commentId}`, { reactions });
      toast.success("Emoji eklendi.");
      return response.data;
    } catch (error) {
      toast.error("Emoji eklenemedi", error.message);
      throw error;
    }
  },
  async fetchTotalCommentsCount(fileId) {
    try {
      const response = await axios.get(`/comments/count/${fileId}`);
      console.log('Total comments count:', response.data);
      return response.data;
    } catch (error) {
      toast.error("Toplam yorum sayısı alınırken bir hata oluştu:", error.message);
      throw error;
    }
  },
};
