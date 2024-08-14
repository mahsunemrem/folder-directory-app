import { createApp } from 'vue'
import App from './App.vue'

// vuex
import store from './store/index';

// vue-router
import router from '@/router/index'; // Yönlendirici ayarlarını içeren dosya

import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

import loading from '@/loading/loading.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(CkeditorPlugin);
app.use(loading);

app.mount('#app');




