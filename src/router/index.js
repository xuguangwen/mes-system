import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
//异步懒加载路由:方案1
// const first =()=>import(/* webpackChunkName: "group-foo" */ "../components/first.vue");
//方案2
// const first = r => require.ensure([], () => r(require('../components/first.vue')), 'chunkname1')
//模板
const Layout = resolve => require(['@/views/layout'], resolve)
const Table = r => require(['@/views/table/index'], r)
const Graph = r => require(['@/views/graph/index'], r)
const CreateChart = r => require(['@/views/graph/create'], r)
const Demo = r => require(['@/views/demo/index'], r)
export const constantRouterMap = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    meta: { title: '404' },
    component: () => import('@/views/errorPage/404.vue')
  },
  {
    path: '/403',
    meta: { title: '403' },
    component: () => import('@/views/errorPage/403.vue')
  },
  {
    path: '/login',
    component: resolve => require(['@/views/login/index.vue'], resolve)
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '自述文件' },
    children: [
      {
        path: '/home',
        meta: { title: '系统首页' },
        component: () => import('@/views/home/index.vue')
      },

      /*************************************表格组件************************************* */
      {
        path: '/table',
        component: Table,
        children: [
          {
            path: '/table/pageTable',
            meta: { title: '分页记忆表单' },
            component: () =>
              import('@/views/table/pageTable/index')
          },
          {
            path: '/table/treeTable',
            meta: { title: '树形表格' },
            component: () =>
              import('@/views/table/treeTable/index')
          },
          {
            path: '/table/customTreeTable',
            meta: { title: '自定义列表格' },
            component: () =>
              import('@/views/table/treeTable/customTreeTable')
          },
          {
            path: '/table/LLCTreeTable',
            meta: { title: '低阶码树表格' },
            component: () =>
              import('@/views/table/treeTable/LLCTreeTable')
          },
          {
            path: '/table/vueDialogTable',
            meta: { title: '拖拽表格' },
            component: () =>
              import('@/views/table/vueDialogTable.vue')
          },
        ]
      },
      /********************************************图形组件*******************************************/
      {
        path: '/graph',
        redirect: "/graph/create",
        component: Graph,
        children: [
          {
            path: "/graph/create",
            meta: { title: '自创类图形' },
            component: CreateChart,
            children: [
              {
                path: "/graph/create/ganntChart",
                meta: { title: '甘特图' },
                component: () =>
                  import('@/views/graph/create/ganntChart.vue')
              },
              {
                path: "/graph/create/planSchedule",
                meta: { title: "计划排程图" },
                component: () =>
                  import('@/views/graph/create/planSchedule.vue')
              },
              {
                path: "/graph/create/progress",
                meta: { title: "计划进度图" },
                component: () =>
                  import('@/views/graph/create/progress.vue')
              },
              {
                path: "/graph/create/planFlow",
                meta: { title: "计划流程图" },
                component: () =>
                  import('@/views/graph/create/planFlow.vue')
              },
              // {
              //   path: "/graph/create/calendarChart",
              //   meta: { title: "计划日历图" },
              //   component: () =>
              //     import('@/views/graph/create/calendarChart.vue')
              // },
              {
                path: "/graph/create/calendarChart",
                meta: { title: "计划日历图" },
                component: () =>
                  import('@/views/graph/create/planCalendar.vue')
              }
            ]
          },
          {
            path: "/graph/echarts",
            meta: { title: 'echarts类图形' },
            component: () =>
              import('@/views/graph/echarts/index.vue')
          },
          {
            path: "/graph/AntV",
            meta: { title: 'AntV类图形' },
            component: () =>
              import('@/views/graph/AntV/index.vue')
          }
        ]
      },
      /**********************************************实用案例************************************************ */
      {
        path: '/demo',
        redirect: "/demo/drag",
        component: Demo,
        children: [
          {
            path: '/demo/drag',
            meta: { title: '拖拽' },
            component: () =>
              import('@/views/demo/drag.vue')
          },
          {
            path: '/demo/resizable',
            meta: { title: '可变窗口' },
            component: () =>
              import('@/views/demo/Resizable.vue')
          },
          {
            path: '/demo/globalDialog',
            meta: { title: '全局弹框' },
            component: () =>
              import('@/views/demo/globalDialog.vue')
          },
          {
            path: '/demo/dragDialog',
            meta: {
              title: '拖拽 Dialog'
            },
            component: () => import('@/views/demo/dragDialog')
          },

        ]
      },
    ]
  },
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
