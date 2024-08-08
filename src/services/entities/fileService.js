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
  async addFile(fileData) {
    const response = await axios.post('/files', fileData);
    return response.data;
  },
  async fileDelete(fileId){
    const response = await axios.delete('/files',fileId);
    return response.data;
  }
};