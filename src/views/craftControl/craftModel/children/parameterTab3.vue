/*
 * @Author: xgw 
 * @Date: 2019-05-15 11:51:15 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 11:53:08
 */
<!--投料过程参数配置-->
<template>
  <div class="parameterTab3">
    <div class="mt-3 el-card box-card is-always-shadow" style="width:600px">
        <div class="el-card__header fz16">#参数名称#</div>
        <div class="el-card__body">
          <el-form :model="parameterForm" label-width="120px" label-position="left">
            <el-form-item label="参数值种类">
              <el-select v-model="parameterForm.parameterType">
                <el-option v-for="item in parameterTypeData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="参数值是否分档">
              <el-switch v-model="parameterForm.classify" active-text="是" inactive-text="否" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
              <el-button type="primary" round size="small" class="ml-5" :disabled="!parameterForm.classify">增加分档</el-button>
            </el-form-item>
          </el-form>
          <div class="el-card box-card">
            <div class="el-card__header fz16">分档1</div>
            <div class="el-card__body">
              <el-form :model="parameterForm" label-width="120px" label-position="left">
                <el-form-item label="分档名称">
                  <el-input v-model="parameterForm.a"></el-input>
                </el-form-item>
                <el-form-item label="参数值">
                  <el-input v-model="parameterForm.b"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "parameterTab3",
  data() {
    return {
      parameterTypeData: [
        {
          value: "0",
          label: "固定值"
        },
        {
          value: "1",
          label: "范围值"
        },
        {
          value: "2",
          label: "浮动值"
        },
        {
          value: "3",
          label: "计算值"
        },
        {
          value: "4",
          label: "文本描述"
        }
      ],
      parameterForm: {
        classify: true, //参数值是否分档
        parameterType: "0", //参数值种类
        a: "",
        b: ""
      }
    };
  },
  mounted() {},
  methods: {
  }
};
</script>
