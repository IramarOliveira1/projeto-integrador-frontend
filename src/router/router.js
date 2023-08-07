import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/login', component: () => import('../pages/login/login.vue'),
    },
    {
        path: '/esqueceu-senha', component: () => import('../pages/forgot-password/forgot-password.vue'),
    },
    {
        path: '/',
        component: () => import('../pages/home/home.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;