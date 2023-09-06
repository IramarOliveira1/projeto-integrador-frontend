import { createStore } from "vuex";

import createPersistedState from 'vuex-persistedstate';

import user from './user/user';
import generic from './generic/generic';
import insurance from './insurance/insurance';
import agency from './agency/agency';
import vehicle from './vehicle/vehicle';

const store = createStore({
    modules: {
        user: user,
        generic: generic,
        insurance: insurance,
        agency: agency,
        vehicle: vehicle
    },
    plugins: [createPersistedState()]
})

export default store;