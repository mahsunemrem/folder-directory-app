// src/services/ApiService.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7067/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Diğer isteğe bağlı başlık ayarları
  }
});

export default axiosInstance;
