//路由分类
export default [{
    icon: "el-icon-setting",
    index: "home",
    title: "系统首页"
  },
  {
    icon: "el-icon-setting",
    index: "table",
    title: "表格组件",
    subs: [{
      index: "pageTable",
      title: "分页记忆表格"
    },
    {
      index: "treeTable",
      title: "树形表格",
    }
  ]
  },
  {
    icon: "el-icon-setting",
    index: "3",
    title: "表单相关",
    subs: [{
        index: "form",
        title: "基本表单"
      },
      {
        index: "3-2",
        title: "三级菜单",
        subs: [{
          icon: "el-icon-setting",
          index: "drag",
          title: "拖拽列表"
        }]
      }
    ]
  }
]
