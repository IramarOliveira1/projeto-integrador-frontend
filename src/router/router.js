import { createRouter, createWebHistory } from "vue-router";

import store from '../modules/index.js';

const routes = [
    {
        path: '/login', component: () => import('../pages/login/login.vue'), name: 'login'
    },
    {
        path: '/esqueceu-senha', component: () => import('../pages/forgot-password/forgot-password.vue'), name: 'retrieve-password',
    },
    {
        path: '/recuperar-senha', component: () => import('../pages/forgot-password/change-password.vue'), name: 'forget-password',
    },
    {
        path: '/cadastrar-cliente', component: () => import('../pages/register/user/user.vue'), name: 'register-client',
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
    {
        path: '/pagamento', component: () => import('../pages/payment/payment.vue'), meta: { admin: true, guest: true }, name: 'payment'
    },
    {
        path: '/reservas', component: () => import('../pages/reserve/reserve.vue'), meta: { admin: true, guest: false }, name: 'reserve'
    },
    {
        path: '/minhas-reservas', component: () => import('../pages/reserve/reserveUser.vue'), meta: { admin: true, guest: true }, name: 'reserveUser'
    },
    {
        path: '/:notFound', component: () => import('../pages/notfound/notfound.vue'), meta: { admin: true, guest: true }, name: 'notfound'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve(async (to, from, next) => {
    if (to.name === 'list-vehicle' && !store.getters['home/getData'].startDate) {
        next('/');
        return;
    }

    if (to.name === 'payment' && !store.getters['home/getData'].startDate) {
        next('/');
        return;
    }

    if (!store.getters['user/getIsAuthenticated'] && to.name === 'home' || to.name === 'list-vehicle' || to.name == 'payment') {
        next();
        return;
    }
    if (store.getters['user/getIsAuthenticated'] && to.meta.admin && !to.meta.guest && store.getters['user/getUser'].role === 'ADMIN') {
        next();
        return;
    }

    if (store.getters['user/getIsAuthenticated'] && to.meta.admin && to.meta.guest && store.getters['user/getUser'].role === 'USER') {
        next();
        return;
    } else if (store.getters['user/getIsAuthenticated'] && !to.meta.guest) {
        if (to.name === 'forget-password' || to.name === 'login' || to.name === 'retrieve-password' || to.name === 'register-client') {
            return next('/dashboard');
        }
        return next('/notFound');
    }

    if (to.matched.some(record => record.meta.admin)) {
        const token = localStorage.getItem('token');

        if (!token && !store.getters['user/getIsAuthenticated']) {
            localStorage.clear();
            next('/login');
            return;
        }
        next()
    } else {
        next()
    }
});

export default router;