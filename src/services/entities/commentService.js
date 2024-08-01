import axios from '@/services/api';
import toast from '@/plugins/sweetalert';

export default {
  async getCommentsByFileId(fileId) {
    try {
      const response = await axios.get(`/files/${fileId}/comments`);
      return response.data;
    } catch (error) {
      toast.error("Bir Hata oluştu", error.message);
    }
  },
};

// import axios from '@/services/api';
// import toast from '@/plugins/sweetalert';

// export default {
//   async getCommentsByFileId(fileId) {
//     try {
//       const response = await axios.get(`/comments/file/${fileId}`);
//       return response.data;
//     } catch (error) {
//       toast.error("Bir Hata oluştu", error.message);
//     }
//   }
// };

