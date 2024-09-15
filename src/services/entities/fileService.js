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
      console.log("API response:", response.data);  // Log the API response
      
      if (response.data === null || response.data.length === 0) {
        toast.info("Bu klasörde dosya bulunmamaktadır");
      }
      return response.data;
    } catch (error) {
      console.error("Error in getFilesByFolderId:", error);  // Log the error message
      toast.error("Bir Hata oluştu", error.message);
    }
  },
  async addFile(fileData) {
    const response = await axios.post('/files', fileData);
    return response.data;
  },
  async fileDelete(fileId){
    const response = await axios.delete(`/files/${fileId}`);
    return response.data;
  }
};