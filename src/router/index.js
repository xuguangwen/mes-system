import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//异步懒加载路由:方案1
// const first =()=>import(/* webpackChunkName: "group-foo" */ "../components/first.vue");
//方案2
// const first = r => require.ensure([], () => r(require('../components/first.vue')), 'chunkname1')
//模板
const Layout = resolve => require(['@/views/layout'], resolve)
const table = r => require(['@/views/table/index'], r)
export const constantRouterMap = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '自述文件'
    },
    children: [{
        path: '/home',
        meta: {
          title: '系统首页'
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/form',
        meta: {
          title: '基本表单'
        },
        component: () => import('@/views/form/index.vue')
      },
      //表格组件
      {
        path: '/table',
        component: table,
        children: [{
            path: '/pageTable',
            meta: {
              title: '分页记忆表单'
            },
            component: () =>
              import('@/views/table/pageTable/index')
          },
          {
            path: '/treeTable',
            meta: {
              title: '树形表格'
            },
            component: () =>
              import('@/views/table/treeTable/index')
          },
          {
            path: '/customTreeTable',
            meta: {
              title: '自定义列表格'
            },
            component: () =>
              import('@/views/table/treeTable/customTreeTable')
          },
          {
            path: '/LLCTreeTable',
            meta: {
              title: '低阶码树表格'
            },
            component: () =>
              import('@/views/table/treeTable/LLCTreeTable')
          }
        ]
      },
      //图形组件
      // {
      //   path: '/flow',
      //   meta: {
      //     title: '工业流程图'
      //   },
      //   component: () =>
      //     import('@/views/chart/flow.vue')
      // },
      {
        path: '/flow',
        meta: {
          title: '工业流程图'
        },
        component: () =>
          import('@/views/demo/ERcomponent.vue')
      },
      {
        path: '/gannt',
        meta: {
          title: '甘特图'
        },
        component: () =>
          import('@/views/chart/ganntChart.vue')
      },
      {
        path: '/planSchedule',
        meta: {
          title: '计划排程甘特图'
        },
        component: () =>
          import('@/views/chart/planSchedule.vue')
      },
      {
        path: '/progress',
        meta: {
          title: '计划进度图'
        },
        component: () =>
          import('@/views/chart/progress.vue')
      },
      {
        path: '/resizable',
        meta: {
          title: '可变窗口'
        },
        component: () =>
          import('@/views/chart/Resizable.vue')
      },
      //demo
      {
        path: '/drag',
        meta: {
          title: '拖拽'
        },
        component: () =>
          import('@/views/demo/drag.vue')
      },
      {
        path: '/treeChart',
        meta: {
          title: '树形图'
        },
        component: () =>
          import('@/views/demo/treeChart.vue')
      },
      {
        path: '/calendarChart',
        meta: {
          title: '计划日历'
        },
        component: () =>
          import('@/views/demo/calendarChart.vue')
      },
      {
        path: '/vueDialogTable',
        meta: {
          title: '拖拽表格'
        },
        component: () =>
          import('@/views/demo/vueDialogTable.vue')
      },
      {
        path: '/globalDialog',
        meta: {
          title: '全局弹框'
        },
        component: () =>
          import('@/views/demo/globalDialog.vue')
      },

      {
        path: 'drag-dialog',
        meta: {
          title: '拖拽 Dialog'
        },
        component: () => import('@/views/components-demo/dragDialog')
      },

      {
        path: '/404',
        meta: {
          title: '404'
        },
        component: () => import('@/views/errorPage/404.vue')
      },
      {
        path: '/403',
        meta: {
          title: '403'
        },
        component: () => import('@/views/errorPage/403.vue')
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
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
