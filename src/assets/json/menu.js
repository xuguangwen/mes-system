//路由分类
export default [
  {
    icon: "el-icon-xgw-home",
    index: "home",
    title: "系统首页"
  },
  /*************************************Table组件**********************************/
  {
    icon: "el-icon-xgw-biaogeshezhi",
    index: "table",
    title: "表格组件",
    subs: [
      {
        index: "/table/pageTable",
        title: "分页记忆表格"
      },
      {
        index: "/table/treeTable",
        title: "树形表格",
      },
      {
        index: "/table/customTreeTable",
        title: "自定义列表格",
      },
      {
        index: "/table/LLCTreeTable",
        title: "低阶码树表格"
      },
      {
        index:"/table/vueDialogTable",
        title:"拖拽表格"
      }
    ]
  },
  /*************************************图形组件**********************************/
  {
    icon: "el-icon-xgw-graphical",
    index: "graph",
    title: "图形组件",
    subs: [
      {
        index: "/graph/create",
        title: "create图形",
        subs: [
          {
            index: "/graph/create/ganntChart",
            title: "甘特图",
          },
          {
            index: "/graph/create/planSchedule",
            title: "计划排程图",
          },
          {
            index: "/graph/create/progress",
            title: "计划进度图"
          },
          {
            index:"/graph/create/planFlow",
            title:"计划流程图"
          },
          {
            index:"/graph/create/calendarChart",
            title:"计划日历图"
          }
        ]
      },
      {
        index: "/graph/echarts",
        title: "echart图形",
      },
      {
        index: "/graph/AntV",
        title: "Antv图形",
      },
    ]
  },
  /*************************************日常demo**********************************/
  {
    icon: "el-icon-share",
    index: "demo",
    title: "实用案例",
    subs: [
      {
        index: "/demo/drag",
        title: "拖拽",
      },
      {
        index: "/demo/globalDialog",
        title: "全局弹框",
      },
      {
        index: '/demo/dragDialog',
        title: '拖拽 Dialog'
      }
    ]
  },
]
