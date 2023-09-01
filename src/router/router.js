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
        path: '/', component: () => import('../pages/home/home.vue'), name: 'home',
    },
    {
        path: '/dashboard', component: () => import('../pages/dashboard/dashboard.vue'), meta: { requiresAuth: true }, name: 'dashboard'
    },
    {
        path: '/clientes', component: () => import('../pages/list/client/client.vue'), meta: { requiresAuth: true }
    },
    {
        path: '/funcionarios', component: () => import('../pages/list/employee/employee.vue'), meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {
    if (store.getters.isAuthenticated && to.name === 'home') {
        next();
        return;
    } else if (store.getters.isAuthenticated && !to.meta.requiresAuth) {
        next('/dashboard');
        return;
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
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