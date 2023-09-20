
import axios from '../../services/api.js';

import notifications from '../../helpers/notification/notification.js';

const reserve = {
    namespaced: true,
    state: {
        vehicles: []
    },

    getters: {
        getVehicles(state) {
            return state.vehicles;
        },
    },

    mutations: {
        setVehicles(state, payload) {
            return state.vehicles = payload;
        },
    },
}

export default reserve;