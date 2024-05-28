import {createRouter, createWebHistory} from "vue-router";

const routes= [
    {
        path: "/home",
        name: "home",
        component: () => import("@/public/pages/home/home.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;
