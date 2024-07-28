import { createMemoryHistory, createRouter } from 'vue-router'

import FileComponent from '@/components/FileComponent.vue'
import HomePage from '@/pages/HomePage.vue';

const routes = [
  { path: '/', name:'home', component: HomePage },
  { path: '/file', name:'file', component: FileComponent }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;