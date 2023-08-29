import { createRouter, createWebHistory } from "vue-router";

import store from '../modules/index.js';

const routes = [
    {
        path: '/login', component: () => import('../pages/login/login.vue'),
    },
    {
        path: '/recuperar-senha', component: () => import('../pages/forgot-password/forgot-password.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/esqueceu-senha', component: () => import('../pages/forgot-password/change-password.vue'),
    },
    {
        path: '/cadastrar-cliente', component: () => import('../pages/register/user/user.vue'),
    },
    {
        path: '/', component: () => import('../pages/home/home.vue'),
    },
    {
        path: '/dashboard', component: () => import('../pages/dashboard/dashboard.vue'),
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const user = localStorage.getItem('user');

        if (!user) {
            next('/login');
            return;
        }

        console.log(store.state.isLoggedIn);
        // if (store.state.isLoggedIn) {
        //     next('/dashboard');
        //     return;
        // }

        next();
    } else {
        next()
    }
})

export default router;