import { createStore } from "vuex";

import createPersistedState from 'vuex-persistedstate'

import user from './user/user'

const store = createStore({
    modules: {
        user: user
    },
    plugins: [createPersistedState()]
})

export default store;