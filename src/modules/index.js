import { createStore } from "vuex";

import createPersistedState from 'vuex-persistedstate';

import user from './user/user';
import generic from './generic/generic';
import insurance from './insurance/insurance';

const store = createStore({
    modules: {
        user: user,
        generic: generic,
        insurance: insurance
    },
    plugins: [createPersistedState()]
})

export default store;