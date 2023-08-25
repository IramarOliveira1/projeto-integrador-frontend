import { createApp } from 'vue';

import axios from 'axios';

import notification from './helpers/notification/notification.js'
import clearForm from './helpers/clearForm/clearForm.js'

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

app.config.globalProperties.$clearForm = { clearForm }

app.mount("#app");

