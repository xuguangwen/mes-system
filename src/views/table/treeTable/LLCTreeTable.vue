<template>
  <div class="app-container">

    <p>低阶码树表格</p>

    <tree-table :data="data" :eval-func="func" :expand-all="expandAll" border>
      <el-table-column label="物料编码">
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.event }}</span>
          <!-- <el-tag>{{ scope.row.timeLine+'ms' }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="物料名称">
        <template slot-scope="scope">
          <span>{{ scope.row.event }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格型号">
        <template slot-scope="scope">
          <span>{{ scope.row.event }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.event }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.event }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          <span>{{ scope.row.timeLine}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-close" circle size="small" @click="removeTree(scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-plus" circle @click="addTree(scope.row)" size="small"></el-button>
        </template>
      </el-table-column>
    </tree-table>
    <el-button type="primary">添加</el-button>
  </div>
</template>

<script>
import treeTable from "@/components/TreeTable";
import treeToArray from "./customEval";

export default {
  name: "CustomTreeTableDemo",
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,//默认不全展开
      data: {
        id: 1,
        event: "事件1",
        timeLine: 100,
        comment: "无",
        children: [
          {
            id: 2,
            event: "事件2",
            timeLine: 10,
            comment: "无"
          },
          {
            id: 3,
            event: "事件3",
            timeLine: 90,
            comment: "无",
            children: [
              {
                id: 4,
                event: "事件4",
                timeLine: 5,
                comment: "无"
              },
              {
                id: 5,
                event: "事件5",
                timeLine: 10,
                comment: "无"
              },
              {
                id: 6,
                event: "事件6",
                timeLine: 75,
                comment: "无",
                children: [
                  {
                    id: 7,
                    event: "事件7",
                    timeLine: 50,
                    comment: "无",
                    children: [
                      {
                        id: 71,
                        event: "事件71",
                        timeLine: 25,
                        comment: "xx"
                      },
                      {
                        id: 72,
                        event: "事件72",
                        timeLine: 5,
                        comment: "xx"
                      },
                      {
                        id: 73,
                        event: "事件73",
                        timeLine: 20,
                        comment: "xx"
                      }
                    ]
                  },
                  {
                    id: 8,
                    event: "事件8",
                    timeLine: 25,
                    comment: "无"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    addTree(data) {
      console.log(data)
      if (data.children) {
        data.children.unshift({
          id: 2233,
          event: "添加的事件哦！",
          timeLine: 10,
          comment: "无"
        });
      } else {
        data.children = [
          {
            id: 2233,
            event: "添加的事件哦！",
            timeLine: 20,
            comment: "无"
          }
        ];
      }
    },
    removeTree(data){
      console.log(data)
    }
  }
};
</script>
