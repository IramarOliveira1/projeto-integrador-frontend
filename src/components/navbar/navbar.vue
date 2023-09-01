<template>
    <a-layout class="layout navbar">
        <a-layout-header>
            <a-menu theme="dark" mode="horizontal">
                <div v-if="this.$store.getters.isAuthenticated && this.$store.getters.getUserLogin.role === 'ADMIN'">
                    <router-link to="/clientes">
                        <a-menu-item key="2">Clientes</a-menu-item>
                    </router-link>
                    <router-link to="/funcionarios">
                        <a-menu-item key="4">Funcionários</a-menu-item>
                    </router-link>
                </div>

                <div v-if="this.$store.getters.isAuthenticated">

                    <router-link to="/dashboard">
                        <a-menu-item key="6">Dashboard</a-menu-item>
                    </router-link>
                    
                    <router-link to="/perfil">
                        <a-menu-item key="5">Perfil</a-menu-item>
                    </router-link>

                    <router-link to="/login">
                        <a-menu-item key="1" @click="logout">Logout</a-menu-item>
                    </router-link>
                </div>

                <div v-else>
                    <router-link to="/login">
                        <a-menu-item key="3">Login</a-menu-item>
                    </router-link>
                </div>
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