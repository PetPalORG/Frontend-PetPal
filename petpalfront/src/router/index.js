import {createRouter, createWebHistory} from "vue-router";

const routes= [
    {
        path: "/pet-register",
        name: "pet-register",
        component: () => import("@/pets/pages/pet-register/pet-register.vue")
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/public/pages/home/home.vue")
    },
    {
        path: "/pet/:id",
        name: "pet",
        component: () => import("@/pets/pages/profiles/profiles.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;
