
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const model = {
    namespaced: true,
    state: {
        data: {
            nome: null,
            quantidade: null,
            image: null
        },
        models: []
    },

    getters: {
        getModels(state) {
            return state.models;
        },
        getData(state) {
            return state.data;
        },

        getImage(state) {
            return state.data.image;
        },
    },

    mutations: {
        setModels(state, payload) {
            return state.models = payload;
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

                const response = await axios.get('/model/all');

                commit('setModels', response.data);
            } catch (error) {
                notifications(error.response.status, error.response.data.message);
            }
        },

        async save({ dispatch, state }, data) {
            let formData = new FormData();

            formData.append('name', data.nome);
            formData.append('image', state.data.image);

            const response = await axios.post('/model/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch('all');
            return response;
        },

        async index({ commit }, id) {

            const response = await axios.get(`model/${id}`);

            commit('setData', response.data[0]);

            return response;
        },

        async filter({ commit }, data) {
            const response = await axios.post('model/filter', data);

            commit('setModels', response.data);
        },

        async update({ dispatch, state }, data) {
            let formData = new FormData();

            formData.append('name', data.data.nome);
            formData.append('image', state.data.image);

            const response = await axios.put(`/model/${data.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch('all');
            return response;
        },

        async destroy({ dispatch }, id) {

            const response = await axios.delete(`/model/${id}`);

            dispatch('all');
            return response;
        },
    }
}

export default model;