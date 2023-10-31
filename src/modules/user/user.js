import axios from '../../services/api.js';

import axiosLib from 'axios';

import notifications from '../../helpers/notification/notification.js';

const user = {
    namespaced: true,
    state: {
        user: [],
        users: [],
        isAuthenticated: false,
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

    getters: {
        getData(state) {
            return state.data;
        },

        getUser(state) {
            return state.user;
        },

        getUsers(state) {
            return state.users;
        },

        getIsAuthenticated(state) {
            return state.isAuthenticated;
        },
    },

    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        },

        setUser(state, payload) {
            state.user = payload;
        },

        setData(state, payload) {
            state.data = payload;
        },

        clearForm(state, payload) {
            state.data = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
    },

    actions: {
        async me({ commit }) {

            const response = await axios.get('/user/me');

            commit('setUser', response.data);

            commit('setIsAuthenticated', true);
        },

        async save({ dispatch, state }, data) {
            const request = { ...data.data, role: data.role }
            const response = await axios.post('/user/register', request);

            if (state.user.isAuthenticated) {
                dispatch('all', data);
            }
            return response;
        },

        async all({ commit }, role) {
            try {
                const response = await axios.get('/user/all', { params: { role: role.role } });

                commit('setUsers', response.data);

                return response;
            } catch (error) {
                notifications(error.response.status, error.response.data.message)
            }
        },

        async filter({ commit }, data) {
            const response = await axios.post('user/filter', { nameOrCpf: data.data, role: data.role });

            commit('setUsers', response.data);
        },

        async index({ commit, getters }, id) {
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

            commit('setData', data);

            return response;
        },

        async update({ dispatch }, data) {

            const response = await axios.put(`/user/${data.id}`, data.data);

            dispatch('all', data)

            return response;
        },

        async destroy({ dispatch }, data) {
            const response = await axios.delete(`user/${data.id}`);

            dispatch('all', data);

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