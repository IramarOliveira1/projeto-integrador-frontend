import { createApp } from 'vue';

import vuex from './modules/index';

import VueTheMask from 'vue-the-mask'

import money from 'v-money'

import axios from 'axios';

import notification from './helpers/notification/notification.js'

import VueCreditCardValidation from 'vue-credit-card-validation';

import './css/global.css';

import App from './App.vue';

import router from './router/router';

import 'ant-design-vue/dist/reset.css';

const axiosInstance = axios.create({
    withCredentials: false,
})

const app = createApp(App).use(router).use(vuex).use(VueCreditCardValidation ).use(VueTheMask).use(money, { precision: 4 });

app.config.globalProperties.$axios = { ...axiosInstance }

app.config.globalProperties.$notification = { notification }

app.mount("#app");

