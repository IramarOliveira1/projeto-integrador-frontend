import { createStore } from "vuex";

import createPersistedState from 'vuex-persistedstate';

import user from './user/user';
import generic from './generic/generic';
import insurance from './insurance/insurance';
import agency from './agency/agency';

const store = createStore({
    modules: {
        user: user,
        generic: generic,
        insurance: insurance,
        agency: agency
    },
    plugins: [createPersistedState()]
})

export default store;