<template>
    <a-layout class="layout">
        <a-layout-header>
            <a-menu theme="dark" mode="horizontal">
                <router-link to="/login" v-if="this.$store.getters.isAuthenticated">
                    <a-menu-item key="1" @click="logout">logout</a-menu-item>
                </router-link>
                <router-link to="/login" v-else>
                    <a-menu-item key="1">login</a-menu-item>
                </router-link>
            </a-menu>
        </a-layout-header>
    </a-layout>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit('isAuthenticated', false);
            localStorage.clear();
        }
    }
}
</script>