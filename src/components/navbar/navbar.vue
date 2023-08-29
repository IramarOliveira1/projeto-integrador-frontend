<template>
    <a-layout class="layout navbar">
        <a-layout-header>
            <a-menu theme="dark" mode="horizontal">
                <div v-if="this.$store.getters.isAuthenticated">
                    <router-link to="/login">
                        <a-menu-item key="1" @click="logout">logout</a-menu-item>
                    </router-link>
                    <router-link to="/clientes">
                        <a-menu-item key="2">Clientes</a-menu-item>
                    </router-link>
                </div>
                <router-link to="/login" v-else>
                    <a-menu-item key="3">login</a-menu-item>
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