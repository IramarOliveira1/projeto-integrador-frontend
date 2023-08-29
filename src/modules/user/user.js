import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const user = {
    state: {
        data: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: false,
    },

    mutations: {
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        }
    },

    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        }
    },

    actions: {
        async getUser() {
            try {
                await axios.get('/user/2');
            } catch (error) {
                notifications(error.response.status, 'token invalido')
            }
        }
    }
}

export default user;