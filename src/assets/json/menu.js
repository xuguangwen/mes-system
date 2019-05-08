//路由分类
export default [{
    icon: "el-icon-xgw-home",
    index: "home",
    title: "系统首页"
  },
  {
    icon: "el-icon-xgw-biaogeshezhi",
    index: "table",
    title: "表格组件",
    subs: [{
      index: "pageTable",
      title: "分页记忆表格"
    },
    {
      index: "treeTable",
      title: "树形表格",
    },
    {
      index: "customTreeTable",
      title: "自定义列表格",
    },
    {
      index:"LLCTreeTable",
      title:"低阶码树表格"
    }
  ]
  },
  {
    icon: "el-icon-xgw-graphical",
    index: "chart",
    title: "图形相关",
    subs: [
      {
        index: "resizable",
        title: "可变窗口",
      },
      {
        index: "gannt",
        title: "甘特图"
      },
      {
        index: "planSchedule",
        title: "计划排程甘特图"
      },
      {
        index: "progress",
        title: "计划进度图",
      },
      {
        index: "flow",
        title: "工业流程图",
      }
    ]
  },
  {
    icon: "el-icon-share",
    index: "demo",
    title: "简单例子",
    subs: [
      {
        index: "drag",
        title: "拖拽",
      },
      {
        index: "treeChart",
        title: "树形图",
      },
      {
        index: "calendarChart",
        title: "计划日历",
      },
      {
        index: "vueDialogTable",
        title: "拖拽表格",
      },
      {
        index: "globalDialog",
        title: "全局弹框",
      },
    ]
  },
]
