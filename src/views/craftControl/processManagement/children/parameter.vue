/*
 * @Author: xgw 
 * @Date: 2019-05-13 19:36:21 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-14 19:03:27
 */
<!--工序参数信息-->
<template>
  <div class="parameter">
    <div class="switcher">
      <el-button type="primary" class="ml-3" @click="$router.push({path:'/craftControl/processManagement/draft'})">返 回</el-button>
    </div>
    <div class="content">
      <div class="mt-3 el-card box-card is-always-shadow">
        <div class="el-card__body">
          <el-tabs v-model="Type">
            <el-tab-pane name="投料过程参数">
              <span slot="label"><i class="color-danger">*</i>投料过程参数</span>
              <parameter-step></parameter-step>
            </el-tab-pane>
            <el-tab-pane name="生产过程参数">
              <span slot="label"><i class="color-danger">*</i>生产过程参数</span>
              <parameter-step></parameter-step>
            </el-tab-pane>
            <el-tab-pane name="产出物规格参数">
              <span slot="label"><i class="color-danger">*</i>产出物规格参数</span>
              <parameter-step></parameter-step>
            </el-tab-pane>
            <el-tab-pane label="统计参数" name="4">
              <parameter-step></parameter-step>
            </el-tab-pane>
            <el-tab-pane label="生产节拍参数" name="5">
              <parameter-step></parameter-step>
            </el-tab-pane>
            <el-tab-pane label="环境参数" name="6">
              <parameter-step></parameter-step>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import parameterStep from "../components/parameterStep.vue";
export default {
  name: "parameter",
  components: {
    parameterStep
  },
  data() {
    return {
      Type: "投料过程参数"
    };
  },
  methods: {}
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