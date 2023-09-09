
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const vehicle = {
    namespaced: true,

    state: {
        data: {
            ano: null,
            capacidade: null,
            categoria: null,
            valor_diaria: null,
            cor: null,
            marca: null,
            modelo: null,
            placa: null,
            quantidade: null,
            agencia: {
                id: null
            },
            image: null,
        },
        vehicles: []
    },

    getters: {
        getVehicles(state) {
            return state.vehicles;
        },

        getData(state) {
            return state.data;
        },

        getImage(state) {
            return state.data.image;
        },
    },

    mutations: {
        setVehicles(state, payload) {
            return state.vehicles = payload;
        },

        setData(state, payload) {
            return state.data = payload;
        },

        setImage(state, payload) {
            return state.data.image = payload;
        },

        clearForm(state, payload) {
            state.data = payload;
        },
    },

    actions: {

        async all({ commit }) {
            try {

                const response = await axios.get('/vehicle/all');

                commit('setVehicles', response.data);
            } catch (error) {
                notifications(error.response.status, error.response.data.message);
            }
        },

        async save({ dispatch, state }, data) {
            let formData = new FormData();

            formData.append('vehicle', JSON.stringify(data));
            formData.append('image', state.data.image);

            const response = await axios.post('/vehicle/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch('all');
            return response;
        },

        async index({ commit }, id) {

            const response = await axios.get(`vehicle/${id}`);

            commit('setData', response.data[0]);

            return response;
        },


        async filter({ commit }, data) {
            const response = await axios.post('vehicle/filter', data);

            commit('setVehicles', response.data);
        },

        async update({ dispatch, state }, data) {

            let formData = new FormData();

            formData.append('vehicle', JSON.stringify(data.data));
            formData.append('image', state.data.image);

            const response = await axios.put(`/vehicle/${data.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch('all');
            return response;
        },

        async destroy({ dispatch }, id) {

            const response = await axios.delete(`/vehicle/${id}`);

            dispatch('all');
            return response;
        },
    }

}

export default vehicle;