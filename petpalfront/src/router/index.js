import {createRouter, createWebHistory} from "vue-router";

const routes= [
    {
        path: "/pet-register",
        name: "pet-register",
        component: () => import("@/pets/pages/pet-register/pet-register.vue")
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;
