/*
 * @Author: xgw 
 * @Date: 2019-05-15 11:51:15 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 11:53:08
 */
<!--投入产出量配置-->
<template>
  <div class="parameterTab4">
    <div class="mt-3 el-card box-card is-always-shadow stepContent">
      <div class="el-card__header fz16">
        <div class="stepName"> 输入物</div> 
        <div class="operation">
          <el-button type="primary"  size="small" class="ml-5">保 存</el-button>
        </div>
      </div>
      <div class="el-card__body">
        <el-table :data="tableDate" border>
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="material_name" label="物料名称" align="center">
          </el-table-column>
          <el-table-column prop="material_model" label="物料编号" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="输入物" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="单位" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="输入物规格型号" align="center">
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.material_unit"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "parameterTab4",
  data() {
    return {
      tableDate: [
        {
          material_id: "material_id",
          material_name: "material_name",
          material_model: "material_model",
          material_unit: "material_unit"
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