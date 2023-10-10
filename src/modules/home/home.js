
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const home = {
    namespaced: true,
    state: {
        data: {
            startDate: null,
            endDate: null,
            agencia: {
                id: null
            },
            devolution: {
                id: null
            }
        },
        agencies: []
    },

    getters: {
        getAgencies(state) {
            return state.agencies;
        },
        getData(state) {
            return state.data;
        },
        getAgencyDevolution(state) {
            return state.data.endDate;
        },
    },

    mutations: {
        setAgencies(state, payload) {
            return state.agencies = payload;
        },

        setData(state, payload) {
            return state.data = payload;
        },
        setAgencyDevolution(state, payload) {
            return state.data.endDate = payload;
        },

        clearForm(state, payload) {
            state.data = payload;
        },
    },

    actions: {

        async all({ commit }) {
            try {

                const response = await axios.get('/agency/all');

                commit('setAgencies', response.data);
            } catch (error) {
                notifications(error.response.status, error.response.data.message);
            }
        },


        async search({ dispatch }, data) {

            const response = await axios.post('/vehicle/home', data);

            console.log(response.data);
            // dispatch('all');
            return response;
        },
    }
}

export default home;