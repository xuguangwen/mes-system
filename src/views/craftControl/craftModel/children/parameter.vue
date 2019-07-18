/*
 * @Author: xgw 
 * @Date: 2019-05-13 19:36:21 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 12:21:29
 */
<!--工序参数信息-->
<template>
  <div class="parameter">
    <div class="switcher">
      <el-button type="primary" class="ml-3" @click="$router.push({path:'/craftControl/craftModel/draft'})">返 回</el-button>
    </div>
    <div class="content">
      <div class="mt-3 el-card box-card is-always-shadow">
        <div class="el-card__body">
          <div class="mb-3">配置进度</div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
        </div>
      </div>
      <div class="mt-3 el-card box-card is-always-shadow">
        <div class="el-card__body">
          <craft-path ref="craftPath" :name="'craftDraw'" :nodeDataArray="nodeDataArray" :linkDataArray="linkDataArray" @sendPaletteData="receivePalettData"></craft-path>
        </div>
      </div>
      <div class="mt-3 el-card box-card is-always-shadow">
        <div class="el-card__header fz16">工序参数配置 A工序</div>
        <div class="el-card__body">
          <el-tabs v-model="Type">
            <el-tab-pane name="投料过程参数">
              <span slot="label"><i class="color-danger">*</i>投料过程参数</span>
              <parameter-tab1></parameter-tab1>
            </el-tab-pane>
            <el-tab-pane name="生产过程参数">
              <span slot="label"><i class="color-danger">*</i>生产过程参数</span>
              <parameter-tab2></parameter-tab2>
            </el-tab-pane>
            <el-tab-pane name="产出物规格参数">
              <span slot="label"><i class="color-danger">*</i>产出物规格参数</span>
              <parameter-tab3></parameter-tab3>
            </el-tab-pane>
            <el-tab-pane name="投入产出量">
              <span slot="label"><i class="color-danger">*</i>投入产出量</span>
              <parameter-tab4></parameter-tab4>
            </el-tab-pane>
            <el-tab-pane label="统计参数" name="统计参数">
              <parameter-tab5></parameter-tab5>
            </el-tab-pane>
            <el-tab-pane label="生产节拍参数" name="生产节拍参数">
              <parameter-tab6></parameter-tab6>
            </el-tab-pane>
            <el-tab-pane label="环境参数" name="环境参数">
              <parameter-tab7></parameter-tab7>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import parameterTab1 from "./parameterTab1.vue";
import parameterTab2 from "./parameterTab2.vue";
import parameterTab3 from "./parameterTab3.vue";
import parameterTab4 from "./parameterTab4.vue";
import parameterTab5 from "./parameterTab5.vue";
import parameterTab6 from "./parameterTab6.vue";
import parameterTab7 from "./parameterTab7.vue";
import craftPath from "@/components/gojsChart/flowChart";
export default {
  name: "parameter",
  components: {
    craftPath,
    parameterTab1,
    parameterTab2,
    parameterTab3,
    parameterTab4,
    parameterTab5,
    parameterTab6,
    parameterTab7
  },
  data() {
    return {
      Type: "投料过程参数",
      //工艺是数据哦
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
    receivePalettData(obj){
      console.log(obj)
    }
  }
};
</script>

<style lang="scss" scoped>
.parameter {
  .content {
    width: 100%;
    padding: 20px;
    position: relative;
  }
}
</style>