import axios from '@/services/api';
import toast from '@/plugins/sweetalert'

export default {
  async getById(id) {
    try {
      const response = await axios.get(`/files/${id}`);
      return response.data;
    } catch (error) {
      toast.error("Bir Hata oluştu", error.message);
    }
  },

  async getFilesByFolderId(folderId) {
    try {
      const response = await axios.get(`/folders/${folderId}/files`);
      return response.data;
    } catch (error) {
      toast.error("Bir Hata oluştu", error.message);
    }
  },
};