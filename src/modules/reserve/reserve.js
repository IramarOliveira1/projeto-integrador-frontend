
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
        async all({ commit }, id) {
            const response = await axios.get(`reserve/${id}`);

            commit('setReserves', response.data);

            return response;
        },
        async startRent({ dispatch }, data) {

            const response = await axios.post(`reserve/startRent/${data.idReserve}`);

            dispatch('all', data.idUser);
            
            return response;
        },
        async endRent({ dispatch }, data) {

            const response = await axios.post(`reserve/endRent/${data.idReserve}`);

            dispatch('all', data.idUser);
            
            return response;
        },
        async cancellationRent({ dispatch }, data) {

            const response = await axios.post(`reserve/cancellation/${data.idReserve}`);

            dispatch('all', data.idUser);
            
            return response;
        },
    }



}

export default reserve;