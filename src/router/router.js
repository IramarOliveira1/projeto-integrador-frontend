import { createRouter, createWebHistory } from "vue-router";

import store from '../modules/index.js';

const routes = [
    {
        path: '/login', component: () => import('../pages/login/login.vue'), name: 'login'
    },
    {
        path: '/recuperar-senha', component: () => import('../pages/forgot-password/forgot-password.vue'),
    },
    {
        path: '/esqueceu-senha', component: () => import('../pages/forgot-password/change-password.vue'),
    },
    {
        path: '/cadastrar-cliente', component: () => import('../pages/register/user/user.vue'),
    },
    {
        path: '/', component: () => import('../pages/home/home.vue'), meta: { admin: true, guest: true }, name: 'home',
    },
    {
        path: '/dashboard', component: () => import('../pages/dashboard/dashboard.vue'), meta: { admin: true, guest: true }, name: 'dashboard'
    },
    {
        path: '/clientes', component: () => import('../pages/list/client/client.vue'), meta: { admin: true, guest: false }, name: 'client'
    },
    {
        path: '/funcionarios', component: () => import('../pages/list/employee/employee.vue'), meta: { admin: true, guest: false }, name: 'employee'
    },
    {
        path: '/perfil', component: () => import('../pages/profile/profile.vue'), meta: { admin: true, guest: true }, name: 'profile'
    },
    {
        path: '/seguros', component: () => import('../pages/insurance/insurance.vue'), meta: { admin: true, guest: false }, name: 'insurance'
    },
    {
        path: '/agencias', component: () => import('../pages/agency/agency.vue'), meta: { admin: true, guest: false }, name: 'agency'
    },
    {
        path: '/carros', component: () => import('../pages/vehicle/vehicle.vue'), meta: { admin: true, guest: false }, name: 'vehicle'
    },
    {
        path: '/modelos', component: () => import('../pages/model/model.vue'), meta: { admin: true, guest: false }, name: 'model'
    },
    {
        path: '/listar-veiculos', component: () => import('../pages/list/vehicle/listVehicle.vue'), meta: { admin: true, guest: true }, name: 'list-vehicle'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {

    if (!store.getters.isAuthenticated && to.name === 'home' || to.name === 'list-vehicle') {
        next();
        return;
    }

    if (store.getters.isAuthenticated && to.meta.admin && !to.meta.guest && store.getters.getUserLogin.role === 'ADMIN') {
        next();
        return;
    }

    if (store.getters.isAuthenticated && to.meta.admin && to.meta.guest && store.getters.getUserLogin.role === 'USER') {
        next();
        return;
    } else if (store.getters.isAuthenticated && !to.meta.guest) {
        next('/dashboard');
        return;
    }

    if (to.matched.some(record => record.meta.admin)) {
        const user = localStorage.getItem('user');

        if (!user) {
            localStorage.clear();
            next('/login');
            return;
        }

        next()
    } else {
        next()
    }
})

export default router;