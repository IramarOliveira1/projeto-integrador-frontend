
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const payment = {
    namespaced: true,
    state: {
        data: {
            startDateRent: null,
            endDateRent: null,
            startAgency: {
                id: null
            },
            endAgency: {
                id: null
            },

            insurance: {
                id: null
            },
            payment: {
                preco: null,
                tipo_pagamento: {
                    id: null
                }
            },
            user: {
                id: null
            },
            vehicle: {
                id: null
            }
        },
        typePayments: [],
        resume: []
    },

    getters: {
        getData(state) {
            return state.data;
        },
        getResume(state) {
            return state.resume;
        },
        getTypePayment(state) {
            return state.typePayments;
        },
    },

    mutations: {
        setData(state, payload) {
            return state.data = payload;
        },
        setResume(state, payload) {
            return state.resume = payload;
        },
        setTypePayment(state, payload) {
            return state.typePayments = payload;
        },
        clearForm(state, payload) {
            state.data = payload;
        },
    },

    actions: {
        async allTypePayment({ commit }) {
            try {

                const response = await axios.get('/payment-types/all');

                commit('setTypePayment', response.data);
            } catch (error) {
                notifications(error.response.status, error.response.data.message);
            }
        },

        async execute({ }, data) {
            const response = await axios.post('/reserve/register', data);

            return response;
        }
    }

}

export default payment;