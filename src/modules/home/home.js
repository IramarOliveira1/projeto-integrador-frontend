
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const home = {
    namespaced: true,
    state: {
        vehicles: [],
        data: {
            startDate: null,
            endDate: null,
            agencia: {
                id: null
            },
            devolution: {
                id: null
            },
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

        getVehicles(state) {
            return state.vehicles;
        },
    },

    mutations: {
        setAgencies(state, payload) {
            return state.agencies = payload;
        },

        setData(state, payload) {
            return state.data = payload;
        },

        setVehicles(state, payload) {
            return state.vehicles = payload;
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


        async search({ }, data) {
            const response = await axios.post('/vehicle/home', data);

            return response
        },
    }
}

export default home;