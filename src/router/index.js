import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", name: "home", component: () => import('../components/Home.vue') },
        { path: "/about", name: "about", component: () => import('../components/About.vue') },
        {
            path: "/addproduct",
            name: "addproduct",
            component: () => import('../components/AddProduct.vue'),
            meta: {
                requiresAuth: true, // impide acceder si no está logueado
            },
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
        // usuario no logueado redirige
        next("/");
    } else {
        next();
    }
})

export default router;