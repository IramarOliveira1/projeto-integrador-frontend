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
        },

        async save({ }, data) {
            try {

                const response = await axios.post('/user/register', data);

                notifications(response.status, response.data.message);
            } catch (error) {
                notifications(error.response.status, error.response.data.message)
            }
        },

        async getAll() {
            try {

                await axios.get('/user/all', { params: { role: 'USER' } });

            } catch (error) {
                notifications(error.response.status, error.response.data.message)
            }
        }
    }
}

export default user;