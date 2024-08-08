import axios from '@/services/api';
import toast from '@/plugins/sweetalert';

export default {
  async getCommentsByFileId(fileId) {
    try {
      toast.success("İşlem Başarılı.","Yorumlar Geldi.")
      const response = await axios.get(`/files/${fileId}/comments`);
      return response.data;
    } catch (error) {
      toast.error("Bir Hata oluştu", error.message);
    }
  },
  async addComment( commentData) {
    try {
      const response = await axios.post(`/comments`, commentData);
      toast.success("Yorum Eklendi.");
      return response.data;
    } catch (error) {
      toast.error("Yorum Eklenemedi", error.message);
    }
  },
};
