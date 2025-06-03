import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
    path: '/Login',
    name: 'Login',
    component: () =>
        import ('../pages/Login'),
    },
    {
        path: "/Register",
        name: "Register",
        component: () =>
            import ('../pages/Register'),
    },
    {
        path: "/Help",
        name: "Help",
        component: () =>
            import ('../pages/Help'),
    },
    {
        path: "/Account",
        name: "Account",
        component: () =>
            import ('../pages/Account'),
    },
    {
        path: "/NewAsset",
        name: "NewAsset",
        component: () =>
            import ('../pages/NewAsset'),
    },
    {
        path: "/RiskQuestionare",
        name: "RiskQuestionare",
        component: () =>
            import ('../pages/RiskQuestionare'),
    },
    {
        path: "/Home",
        name: "Home",
        component: () =>
            import('../pages/Home'),
        children: [
            { 
                path: 'asset-inventory', 
                name:"AssetInventory",
                component: ()=>
                    import('../pages/Home/AssetInventory.vue')
            }, 
            { 
                path: 'risk-assessment', 
                name:"RiskAssessment",
                component: ()=>
                    import('../pages/Home/RiskAssessment.vue')
            },
            { 
                path: 'risk-management', 
                name:"RiskManagement",
                component: ()=>
                    import('../pages/Home/RiskManagement.vue')
            },
            { path: '', redirect: '/home/asset-inventory' } // 默认重定向
        ]
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