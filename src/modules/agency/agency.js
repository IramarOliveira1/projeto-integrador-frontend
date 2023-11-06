
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

import axiosLib from 'axios';

const agency = {
    namespaced: true,

    state: {
        data: {
            nome: null,
            telefone: null,
            quantidade_total: null,
            address: {
                complement: null,
                uf: null,
                city: null,
                neighborhood: null,
                number: null,
                zipcode: "",
                address: null,
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

        clearForm(state, payload) {
            state.data = payload;
        },
    },

    mutations: {
        setAgencies(state, payload) {
            return state.agencies = payload;
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

                const response = await axios.get('/agency/all');

                commit('setAgencies', response.data);
            } catch (error) {
                notifications(error.response.status, error.response.data.message);
            }
        },

        async save({ dispatch }, data) {

            const response = await axios.post('/agency/register', data);

            dispatch('all');
            return response;
        },

        async index({ commit }, id) {

            const response = await axios.get(`agency/${id}`);

            const data = {
                nome: response.data.nome,
                quantidade_total: response.data.quantidade_total,
                telefone: response.data.telefone,
                address: {
                    zipcode: response.data.address.cep,
                    bairro: response.data.address.bairro,
                    cidade: response.data.address.cidade,
                    complemento: response.data.address.complemento,
                    logradouro: response.data.address.logradouro,
                    uf: response.data.address.uf,
                    numero: response.data.address.numero,
                }
            };

            commit('setData', data);

            return response;
        },


        async filter({ commit }, data) {
            const response = await axios.post('agency/filter', data);

            commit('setAgencies', response.data);
        },

        async update({ dispatch }, data) {
            const response = await axios.put(`/agency/${data.id}`, data.data);

            dispatch('all');
            return response;
        },

        async destroy({ dispatch }, id) {

            const response = await axios.delete(`/agency/${id}`);

            dispatch('all');
            return response;
        },

        async viaCep({ }, data) {
            const response = await axiosLib.get(`https://viacep.com.br/ws/${data.zipcode}/json/`);
            data.logradouro = response.data.logradouro;
            data.uf = response.data.uf;
            data.cidade = response.data.localidade;
            data.bairro = response.data.bairro;
            return response;
        },
    }

}

export default agency;