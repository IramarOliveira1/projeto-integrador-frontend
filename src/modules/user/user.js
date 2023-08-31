import axios from '../../services/api.js';

import axiosLib from 'axios';

import notifications from '../../helpers/notification/notification.js';

const user = {
    state: {
        modalEdit: false,
        clearFilter: false,
        isAuthenticated: false,
        clients: [],
        data: {
            name: null,
            email: null,
            password: null,
            cpf: null,
            phone: null,
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
    },

    mutations: {
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setClients(state, payload) {
            state.clients = payload;
        },

        setUser(state, payload) {
            state.data = payload;
        },

        clearForm(state, payload) {
            state.data = payload;
        },

        setModalEdit(state, payload) {
            state.modalEdit = payload;
        },

        setFilterExits(state, payload) {
            state.clearFilter = payload;
        },
    },

    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },

        getClients(state) {
            return state.clients;
        },

        getUser(state) {
            return state.data;
        },

        getModalEdit(state) {
            return state.modalEdit;
        },

        getFilterExits(state) {
            return state.clearFilter;
        },
    },

    actions: {
        async getUser() {
            try {
                await axios.get('/user/1');
            } catch (error) {
                notifications(error.response.status, 'token invalido')
            }
        },

        async save({ dispatch, state }, data) {

            const response = await axios.post('/user/register', data);

            if (state.isAuthenticated) {
                dispatch('getClients');
            }
            return response;
        },

        async getClients({ commit }) {
            try {

                const response = await axios.get('/user/all', { params: { role: 'USER' } });
                commit('setClients', response.data);

                return response;
            } catch (error) {
                notifications(error.response.status, error.response.data.message)
            }
        },

        async filter({ commit }, nameOrCpf) {
            const response = await axios.post('user/filter', { nameOrCpf: nameOrCpf });

            commit('setClients', response.data);
        },

        async index({ commit }, id) {
            const response = await axios.get(`user/${id}`);

            const data = {
                name: response.data[0].name,
                email: response.data[0].email,
                cpf: response.data[0].cpf,
                phone: response.data[0].phone,
                address: {
                    complement: response.data[0].address.complemento,
                    uf: response.data[0].address.uf,
                    city: response.data[0].address.cidade,
                    neighborhood: response.data[0].address.bairro,
                    number: response.data[0].address.numero,
                    zipcode: response.data[0].address.cep,
                    address: response.data[0].address.logradouro
                }
            }
            commit('setUser', data);
            return response;
        },

        async update({ dispatch }, data) {

            const response = await axios.put(`/user/${data.id}`, data.data);

            dispatch('getClients');

            return response;
        },

        async destroy({ dispatch }, id) {
            const response = await axios.delete(`user/${id}`);
            dispatch('getClients');

            return response;
        },

        async viaCep({ }, data) {
            const response = await axiosLib.get(`https://viacep.com.br/ws/${data.zipcode}/json/`);
            data.address = response.data.logradouro;
            data.uf = response.data.uf;
            data.city = response.data.localidade;
            data.neighborhood = response.data.bairro;
            return response;
        },
    }
}

export default user;