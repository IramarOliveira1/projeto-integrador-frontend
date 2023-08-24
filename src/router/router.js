import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/login', component: () => import('../pages/login/login.vue'),
    },
    {
        path: '/recuperar-senha', component: () => import('../pages/forgot-password/send-mail-forgot-password.vue'),
    },
    {
        path: '/esqueceu-senha', component: () => import('../pages/forgot-password/forgot-password.vue'),
    },
    {
        path: '/cadastrar-cliente', component: () => import('../pages/register/client/client.vue'),
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