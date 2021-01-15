export default[
    {
        path: '/',
        name: 'index',
        component: () => import( '../views/user/Index.vue' ),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( '../views/Login.vue' ),
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import( '../views/Logout.vue' ),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( '../views/Register.vue' ),
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import( '../views/user/Dashboard.vue' ),
    },
];
