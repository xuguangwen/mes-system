import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: resolve => require(['@/views/layout/index.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/home',
                    component: resolve => require(['@/views/home/index.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['@/views/tabs/index.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['@/views/form/index.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                  path: '/table',
                  component: resolve => require(['@/views/table/index.vue'], resolve),
                  meta: { title: '基本表单' }
              },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['@/views/dragList/index.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    path: '/404',
                    component: resolve => require(['@/views/errorPage/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['@/views/errorPage/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['@/views/login/index.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
