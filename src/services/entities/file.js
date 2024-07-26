import axios from '@/services/api';
import toast from '@/plugins/sweetalert'

export default {
  getAll() {
    return axios.get('/files').then(response => {
      return response.data;
    })
      .catch(error => {
        toast.error("Bir Hata oluştu", error.message);
      });
  },

  getById(id) {
    return axios.get(`/files/${id}`).then(response => {
      return response.data;
    })
      .catch(error => {
        toast.error("Bir Hata oluştu", error.message);
      });
  },
};