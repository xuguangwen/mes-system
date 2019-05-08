/*
 * @Author: xgw 
 * @Date: 2019-05-06 10:02:43 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-07 17:45:40
 */
<!--实验工业流程图的抽离-->
<template>
  <div class="flowDome">
    <flow-chart ref="flowChart1" :name="'1'" :nodeDataArray="nodeDataArray" :linkDataArray="linkDataArray"></flow-chart>
    <el-button type="primary" @click="aaa">重新绘制</el-button>
  </div>
</template>
<script>
import flowChart from "@/components/flowChart";
import utils from "@/utils/index";
export default {
  name: "flowDome",
  components: {
    flowChart
  },
  mounted() {
    this.$nextTick(() => {});
  },
  data() {
    return {
      pattern: true,
      nodeDataArray: [
        {
          category: "Start",
          text: "开始",
          key: 0,
          loc: "0 0"
        },
        {
          category: "Next",
          text: "A执行单元",
          key: 1,
          loc: "150 0",
          state: "0"
        },
        {
          category: "Next",
          text: "B执行单元",
          key: 2,
          loc: "300 0",
          state: "1"
        },
        {
          category: "End",
          text: "结束",
          key: 3,
          loc: "450 0"
        }
      ],
      linkDataArray: [
        {
          from: 0,
          to: 1
        },
        {
          from: 1,
          to: 2,
          fromPort: "R",
          toPort: "L"
        },
        {
          from: 2,
          to: 3,
          fromPort: "R",
          toPort: "L"
        }
      ]
    };
  },
  methods: {
    aaa() {
      this.$refs.flowChart1.load();
    }
  }
};
</script>

