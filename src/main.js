import { createApp } from 'vue';

import axios from 'axios';

import notification from './helpers/notification/notification.js'

import './css/global.css';

import App from './App.vue';

import router from './router/router';

import 'ant-design-vue/dist/reset.css';

const axiosInstance = axios.create({
    withCredentials: false,
})

const app = createApp(App).use(router);

app.config.globalProperties.$axios = { ...axiosInstance }

app.config.globalProperties.$notification = { notification }

app.mount("#app");

