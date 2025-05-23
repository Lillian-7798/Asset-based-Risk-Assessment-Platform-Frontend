import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
    path: '/Login',
    name: 'Login',
    component: () =>
        import ('../pages/Login'),

    // children: [{
    //     path: "Login",
    //     name: "Login",
    //     component: () =>
    //         import ('../views/Login'),
    // },
    //     // {
    //     //     path: "Register",
    //     //     name: "Register",
    //     //     component: () =>
    //     //         import ('../views/Register'),
    //     // }
    // ]
    },
    {
        path: "/Register",
        name: "Register",
        component: () =>
            import ('../pages/Register'),
    },
    {
        path: '/',
        redirect: '/Login',
    },
    


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router