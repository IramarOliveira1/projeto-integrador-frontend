const generic = {
    namespaced: true,
    state: {
        modalEdit: false,
        clearFilter: false,
    },

    mutations: {
        setModalEdit(state, payload) {
            state.modalEdit = payload;
        },

        setFilterExits(state, payload) {
            state.clearFilter = payload;
        },
    },

    getters: {
        getModalEdit(state) {
            return state.modalEdit;
        },

        getFilterExits(state) {
            return state.clearFilter;
        },
    },

}

export default generic;