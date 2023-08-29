import axios from '../../services/api.js';

import router from '../../router/router.js';

const user = {
    state: {
        data: JSON.parse(localStorage.getItem('user')),
        isLoggedIn: false,
    },

    mutations: {
        isLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        }
    },

    actions: {
        async getUser() {
            try {
                await axios.get('/user/2');
            } catch (error) {
                localStorage.removeItem('user');
                router.push('/login');
            }
        }
    }
}

export default user;