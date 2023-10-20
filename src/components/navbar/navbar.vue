<template>
    <a-layout class="layout navbar">
        <a-layout-header>

            <div class="button-toggle">
                <a-button @click="openToggle">
                    <MenuUnfoldOutlined />
                </a-button>
            </div>

            <div class="image-navbar-flex">
                <img class="image-navbar" src="../../assets/images/logo_white.png" alt="Imagem navbar">
            </div>

            <div class="toggle-navbar">
                <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="currentRoute">

                    <router-link to="/">
                        <a-menu-item key="home">Home</a-menu-item>
                    </router-link>

                    <div v-if="this.$store.getters['user/getUser'].isAuthenticated">
                        <router-link to="/dashboard">
                            <a-menu-item key="dashboard">Dashboard</a-menu-item>
                        </router-link>

                        <router-link to="/perfil">
                            <a-menu-item key="profile">Perfil</a-menu-item>
                        </router-link>

                        <router-link to="/reservas">
                            <a-menu-item key="reserve">Reserva</a-menu-item>
                        </router-link>
                    </div>

                    <div
                        v-if="this.$store.getters['user/getUser'].isAuthenticated && this.$store.getters['user/getUser'].role === 'ADMIN'">
                        <router-link to="/clientes">
                            <a-menu-item key="client">Cliente</a-menu-item>
                        </router-link>
                        <router-link to="/funcionarios">
                            <a-menu-item key="employee">Funcionário</a-menu-item>
                        </router-link>

                        <router-link to="/seguros">
                            <a-menu-item key="insurance">Seguro</a-menu-item>
                        </router-link>

                        <router-link to="/modelos">
                            <a-menu-item key="model">Modelo</a-menu-item>
                        </router-link>

                        <router-link to="/carros">
                            <a-menu-item key="vehicle">Veiculo</a-menu-item>
                        </router-link>

                        <router-link to="/agencias">
                            <a-menu-item key="agency">Agência</a-menu-item>
                        </router-link>
                    </div>

                    <div v-if="this.$store.getters['user/getUser'].isAuthenticated">
                        <router-link to="/login">
                            <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
                        </router-link>
                    </div>

                    <div v-else>
                        <router-link to="/login">
                            <a-menu-item key="login">Login</a-menu-item>
                        </router-link>
                    </div>

                </a-menu>
            </div>

            <a-drawer v-model:open="toggle" class="custom-class" root-class-name="root-class-name" placement="right"
                width="250" @close="closeToggle">

                <a-menu theme="dark" mode="vertical" v-model:selectedKeys="currentRouteDrawer">

                    <div class="image-drawer-flex">
                        <img class="image-drawer" src="../../assets/images/logo_white.png" alt="Imagem menu lateral">
                    </div>

                    <router-link to="/">
                        <a-menu-item key="home">Home</a-menu-item>
                    </router-link>

                    <div v-if="this.$store.getters['user/getUser'].isAuthenticated">
                        <router-link to="/dashboard">
                            <a-menu-item key="dashboard">Dashboard</a-menu-item>
                        </router-link>

                        <router-link to="/perfil">
                            <a-menu-item key="profile">Perfil</a-menu-item>
                        </router-link>

                        <router-link to="/reservas">
                            <a-menu-item key="reserve">Reserva</a-menu-item>
                        </router-link>
                    </div>

                    <div
                        v-if="this.$store.getters['user/getUser'].isAuthenticated && this.$store.getters['user/getUser'].role === 'ADMIN'">
                        <router-link to="/clientes">
                            <a-menu-item key="client">Cliente</a-menu-item>
                        </router-link>
                        <router-link to="/funcionarios">
                            <a-menu-item key="employee">Funcionário</a-menu-item>
                        </router-link>

                        <router-link to="/seguros">
                            <a-menu-item key="insurance">Seguro</a-menu-item>
                        </router-link>

                        <router-link to="/modelos">
                            <a-menu-item key="model">Modelo</a-menu-item>
                        </router-link>

                        <router-link to="/carros">
                            <a-menu-item key="vehicle">Veiculo</a-menu-item>
                        </router-link>

                        <router-link to="/agencias">
                            <a-menu-item key="agency">Ag�ncia</a-menu-item>
                        </router-link>
                    </div>

                    <div v-if="this.$store.getters['user/getUser'].isAuthenticated">
                        <router-link to="/login">
                            <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
                        </router-link>
                    </div>

                    <div v-else>
                        <router-link to="/login">
                            <a-menu-item key="login">Login</a-menu-item>
                        </router-link>
                    </div>

                </a-menu>
            </a-drawer>
        </a-layout-header>
    </a-layout>
</template>

<script>

import { MenuUnfoldOutlined } from '@ant-design/icons-vue';

import './navbar.css'
export default {
    components: {
        MenuUnfoldOutlined
    },
    data() {
        return {
            toggle: false,
            width: 0,
        }
    },
    computed: {
        currentRoute: {
            get() {
                return [this.$router.currentRoute.value.name];
            },
            set(router) {
                return router;
            }
        },
        currentRouteDrawer: {
            get() {
                return [this.$router.currentRoute.value.name];
            },
            set(router) {
                return router;
            }
        },
    },
    watch: {
        width(newVal) {
            if (newVal >= 768) {
                this.toggle = false;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.width = window.innerWidth
        },
        logout() {
            localStorage.removeItem('token');
            window.location.href = '/login'
        },
        openToggle() {
            this.toggle = true;
        },
        closeToggle() {
            this.toggle = false;
        }
    }
}
</script>