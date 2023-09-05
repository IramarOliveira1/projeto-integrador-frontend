
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const insurance = {
    namespaced: true,
    state: {
        data: {
            tipo: null,
            preco: null,
        },
        insurancies: []
    },

    getters: {
        getInsurancies(state) {
            return state.insurancies;
        },
        getData(state) {
            return state.data;
        },
    },

    mutations: {
        setInsurancies(state, payload) {
            return state.insurancies = payload;
        },

        setData(state, payload) {
            return state.data = payload;
        },

        clearForm(state, payload) {
            state.data = payload;
        },
    },

    actions: {

        async all({ commit }) {
            try {

                const response = await axios.get('/insurance/all');

                commit('setInsurancies', response.data);
            } catch (error) {
                notifications(error.response.status, error.response.data.message);
            }
        },

        async save({ dispatch }, data) {

            const response = await axios.post('/insurance/register', data);

            dispatch('all');
            return response;
        },

        async index({ commit }, id) {

            const response = await axios.get(`insurance/${id}`);

            commit('setData', response.data);

            return response;
        },


        async filter({ commit }, data) {
            const response = await axios.post('insurance/filter', data);

            commit('setInsurancies', response.data);
        },

        async update({ dispatch }, data) {

            const response = await axios.put(`/insurance/${data.id}`, data.data);

            dispatch('all');
            return response;
        },

        async destroy({ dispatch }, id) {

            const response = await axios.delete(`/insurance/${id}`);

            dispatch('all');
            return response;
        },
    }
}

export default insurance;