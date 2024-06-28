import {createRouter, createWebHistory} from "vue-router";

const routes= [
    {
        path: "/",
        name: "landing",
        component: () => import("@/user/pages/landing/landing.vue")
    },
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
        path: "/pets",
        name: "pets",
        component: () => import("@/pets/pages/profiles/profiles.vue")
    },
    {
        path: "/pet/:id",
        name: "pet",
        component: () => import("@/pets/pages/profiles/profiles.vue")
    },
    {
        path: "/pet/:id/diet",
        name: "pet-diet",
        component: () => import("@/pets/pages/meals/meals.vue")
    },
    {
        path: "/pet/:id/appointments",
        name: "pet-appointments",
        component: () => import("@/pets/pages/appointments/appointments.vue")
    },
    {
        path: "/pet/:id/treatments",
        name: "pet-treatments",
        component: () => import("@/pets/pages/treatments/treatments.vue")
    },
    {
        path: "/articles",
        name: "articles",
        component: () => import("@/articles/pages/search/search.vue")
    },
    {
        path: "/article/:id",
        name: "article-detail",
        component: () => import("@/articles/pages/detail/detail.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/user/pages/login/login.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/user/pages/register/register.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;
