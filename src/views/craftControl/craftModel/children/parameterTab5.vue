/*
 * @Author: xgw 
 * @Date: 2019-05-15 20:43:25 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 20:43:54
 */
<!--投料过程参数配置-->
<template>
  <div class="parameterTab5">
    <div class="mt-3 el-card box-card is-always-shadow stepContent">
      <div class="el-card__header fz16">
        <div class="stepName">统计参数</div>
        <div class="operation">
          <el-button type="primary" size="small" class="ml-5">保 存</el-button>
        </div>
      </div>
      <div class="el-card__body">
        <el-table :data="tableDate" border>
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="material_name" label="参数名称" align="center">
          </el-table-column>
          <el-table-column prop="material_model" label="参数单位" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="参数标签" align="center">
          </el-table-column>
          <el-table-column label="参数种类值" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.parameterType" >
                <el-option v-for="item in parameterTypeData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.parameterVal"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "parameterTab5",
  data() {
    return {
      tableDate: [
        {
          material_id: "material_id",
          material_name: "material_name",
          material_model: "material_model",
          material_unit: "material_unit",
          parameterType: "0",
          parameterVal: ""
        }
      ],
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
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.stepContent {
  position: relative;
  .stepName {
    height: 32px;
    line-height: 32px;
  }
  .operation {
    position: absolute;
    top: 15px;
    right: 20px;
    height: 40px;
    line-height: 40px;
  }
}
</style>