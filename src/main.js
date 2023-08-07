import { createApp } from 'vue';

import App from './App.vue';

import router from './router/router';

import 'ant-design-vue/dist/reset.css';

createApp(App).use(router).mount('#app');
