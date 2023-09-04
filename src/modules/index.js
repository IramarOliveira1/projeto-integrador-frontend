import { createStore } from "vuex";

import createPersistedState from 'vuex-persistedstate';

import user from './user/user';
import generic from './generic/generic';

const store = createStore({
    modules: {
        user: user,
        generic: generic
    },
    plugins: [createPersistedState()]
})

export default store;