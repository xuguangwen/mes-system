/*
 * @Author: xgw 
 * @Date: 2019-05-13 19:36:21 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 11:09:20
 */
<!--工序基本信息-->
<template>
  <div class="basic">
    <div class="switcher">
      <el-button type="primary" class="ml-3" @click="$router.push({path:'/craftControl/processManagement/draft'})">返 回</el-button>
    </div>
    <div class="content">
      <div class="nameForm">
        <el-form :inline="true" :model="nameForm" :rules="rules" ref="nameForm">
          <el-form-item label="工序版本名称" prop="name">
            <el-input v-model="nameForm.name" placeholder=" 请输入不超过15个字符"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="SubmitNameForm">保 存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="mt-3 el-card box-card is-always-shadow">
        <div class="el-card__body">
          <el-tabs v-model="Type">
            <el-tab-pane name="选择原料">
              <span slot="label"><i class="color-danger">*</i> 选择原料</span>
              <basic-step1></basic-step1>
            </el-tab-pane>
            <el-tab-pane name="选择输出物">
              <span slot="label"><i class="color-danger">*</i> 选择输出物</span>
              <basic-step2></basic-step2>
            </el-tab-pane>
            <el-tab-pane name="选择设备类型">
              <span slot="label"><i class="color-danger">*</i> 选择设备类型</span>
              <basic-step3></basic-step3>
            </el-tab-pane>
            <el-tab-pane label="选择文档" name="4">
              <basic-step4></basic-step4>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import basicStep1 from "./basicStep1.vue";
import basicStep2 from "./basicStep2.vue";
import basicStep3 from "./basicStep3.vue";
import basicStep4 from "./basicStep4.vue";
export default {
  name:"basic",
  components:{
    basicStep1,
    basicStep2,
    basicStep3,
    basicStep4
  },
  data() {
    return {
      nameForm: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入工序版本名称", trigger: "blur" },
          { min: 1, max: 15, message: "限 15 个字以内", trigger: "blur" }
        ]
      },
      Type: "1"
    };
  },
  methods: {
    SubmitNameForm() {
      this.$refs.nameForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.basic {
  .content {
    width: 100%;
    padding: 20px;
    position: relative;
    .nameForm {
      padding: 20px 20px 20px 80px;
      width: 100%;
      height: 100px;
      background-color: #fff;
      border: 1px solid rgb(214, 206, 206);
    }
  }
}
</style>