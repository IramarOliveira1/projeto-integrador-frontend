import { notification } from 'ant-design-vue';

import router from '../../router/router.js';

import store from '../../modules/index.js';

export default function notifications(status, message) {
    switch (status) {
        case 200:
        case 201:
            notification['success']({
                description: message,
            });
            break;

        case 401:
            notification['warning']({
                description: message,
            });

            if (router.currentRoute.value.path !== '/login') {
                store.commit('isAuthenticated', false);
                localStorage.clear();
                router.push('/login')
            }
            break;

        case 400:
        case 403:
        case 404:
            notification['warning']({
                description: message,
            });
            break;

        default:
            notification['error']({
                description: 'N�o foi poss�vel executar essa a��o',
            });
            break;
    }
}