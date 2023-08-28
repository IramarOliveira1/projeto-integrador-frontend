import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/login', component: () => import('../pages/login/login.vue'),
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

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if () {
            
        }
        next('/login')
    } else {
        next()
    }
})

export default router;