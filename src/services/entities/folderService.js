import axios from '@/services/api';
import toast from '@/plugins/sweetalert'

export default {
  async getAll() {
    try {
      const response = await axios.get('/folders');
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Bir Hata oluştu", error.message);
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(`/folders/${id}`);
      return response.data;
    } catch (error) {
      toast.error("Bir Hata oluştu", error.message);
    }
  },
};