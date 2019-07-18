/*
 * @Author: xgw 
 * @Date: 2018-11-30 11:33:32 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-06-01 15:00:03
 */

<template>
  <div class="TreeTableDemo">
    <tree-table :data="data" :columns="columns" border />

    <h1>测试全局filters</h1>
    
    <el-table :data="productionList" v-loading="loading">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column label="生产计划编号" prop="plan_batch" show-overflow-tooltip></el-table-column>
      <el-table-column label="产品名称" prop="product_name" show-overflow-tooltip></el-table-column>
      <el-table-column label="计划负责人" prop="plan_responsible" show-overflow-tooltip></el-table-column>
      <el-table-column label="计划时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>¥{{ scope.row.price | toThousandFilter }}</span>
          <span>测试：时间filter{{new Date() | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-text="scope.row.plan_production_status"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="lookDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import treeTable from "@/components/TreeTable";

export default {
  name: "TreeTableDemo",
  components: { treeTable },
  data() {
    return {
      loading: false,
      //分页
      filter: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      productionList: [{
        plan_batch:"#生产计划编号#",
        product_name:"#产品名称#",
        plan_responsible:"#计划负责人#",
        plan_scheduled_start_time:"1312312312",
        plan_scheduled_completion_time:"2019-05-06 18:00" ,
        plan_production_status:"未开始",
        price:12312312,
      }],


      columns: [
        {
          text: "事件",
          value: "event",
          width: 200
        },
        {
          text: "ID",
          value: "id"
        },
        {
          text: "时间线",
          value: "timeLine"
        },
        {
          text: "备注",
          value: "comment"
        }
      ],
      data: [
        {
          id: 0,
          event: "事件1",
          timeLine: 50,
          comment: "无"
        },
        {
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
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.TreeTableDemo{
  padding: 10px;
}
</style>

