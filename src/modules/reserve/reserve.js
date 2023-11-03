
import axios from '../../services/api.js';

const reserve = {
    namespaced: true,
    state: {
        reserves: []
    },

    getters: {
        getReserves(state) {
            return state.reserves;
        },
    },

    mutations: {
        setReserves(state, payload) {
            return state.reserves = payload;
        },
    },

    actions: {
        async all({ commit }, data) {
            const response = await axios.get('reserve/all', {
                params: {
                    page: data.page,
                    size: 6
                }
            });

            commit('setReserves', response.data);

            return response;
        },

        async index({ commit }, data) {

            const response = await axios.get(`reserve/${data.idUser}`, {
                params: {
                    page: data.page,
                    size: 6
                }
            });

            commit('setReserves', response.data);

            return response;
        },

        async startRent({ dispatch }, data) {

            const response = await axios.post(`reserve/startRent/${data.idReserve}`);

            dispatch('all', { page: data.page });

            return response;
        },
        async endRent({ dispatch }, data) {

            const response = await axios.post(`reserve/endRent/${data.idReserve}`);

            dispatch('all', { page: data.page });

            return response;
        },
        async cancellationRent({ dispatch }, data) {
            const response = await axios.post(`reserve/cancellation/${data.idReserve}`);

            if (data.idUser) {
                dispatch('index', { idUser: data.idUser, page: data.page });
            } else {
                dispatch('all', { page: data.page });
            }

            return response;
        },
        async filter({ commit }, data) {

            const response = await axios.post(`reserve/filter/${data.idUser}`,
                {
                    status: data.status,
                }, {
                params: {
                    page: data.page,
                    size: 6
                }
            });

            commit('setReserves', response.data);

            return response;
        },
        async filterCode({ commit }, data) {

            const response = await axios.post(`reserve/filterCode/${data.idUser}`,
                {
                    code: data.code
                },
                {
                    params: {
                        page: data.page,
                        size: 6
                    }
                });

            commit('setReserves', response.data);

            return response;
        },

        async filterStatusAll({ commit }, data) {

            const response = await axios.post('reserve/filterStatusAll',
                {
                    status: data.status,
                }, {
                params: {
                    page: data.page,
                    size: 6
                }
            });

            commit('setReserves', response.data);

            return response;
        },
        async filterCodeAll({ commit }, data) {

            const response = await axios.post('reserve/filterCodeAll',
                {
                    code: data.code
                },
                {
                    params: {
                        page: data.page,
                        size: 6
                    }
                });

            commit('setReserves', response.data);

            return response;
        },
    }



}

export default reserve;