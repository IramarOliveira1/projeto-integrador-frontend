
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const vehicle = {
    namespaced: true,

    state: {
        data: {
            ano: null,
            capacidade: null,
            cor: null,
            marca: null,
            placa: null,
            agencia: {
                id: null
            },
            modelo: {
                id: null
            },
        },
        vehicles: [],
        agencies: [],
        models: []
    },

    getters: {
        getVehicles(state) {
            return state.vehicles;
        },

        getAgencies(state) {
            return state.agencies;
        },

        getModels(state) {
            return state.models;
        },

        getData(state) {
            return state.data;
        },
    },

    mutations: {
        setVehicles(state, payload) {
            return state.vehicles = payload;
        },

        setAgencies(state, payload) {
            return state.agencies = payload;
        },

        setModels(state, payload) {
            return state.models = payload;
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

                const response = await axios.get('/vehicle/all');

                commit('setVehicles', response.data.veiculo);
                commit('setAgencies', response.data.agencia);
                commit('setModels', response.data.modelo);
            } catch (error) {
                notifications(error.response.status, error.response.data.message);
            }
        },

        async save({ dispatch }, data) {
            const response = await axios.post('/vehicle/register',
                {
                    ano: data.ano,
                    capacidade: data.capacidade,
                    cor: data.cor,
                    marca: data.marca,
                    placa: data.placa,
                    agencia: {
                        id: data.agencia.id
                    },
                    modelo: {
                        id: data.modelo.id
                    },
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

        async update({ dispatch }, data) {
            const response = await axios.put(`/vehicle/${data.id}`, {
                ano: data.data.ano,
                capacidade: data.data.capacidade,
                cor: data.data.cor,
                marca: data.data.marca,
                placa: data.data.placa,
                agencia: {
                    id: data.data.agencia.id
                },
                modelo: {
                    id: data.data.modelo.id
                },
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