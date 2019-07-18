/*
 * @Author: xgw 
 * @Date: 2019-05-15 20:46:23 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 21:07:58
 */
<!--BOM-->
<template>
  <div class="produtionBOM">
    <div class="mt-3 el-card box-card is-always-shadow content">
      <div class="el-card__body">
        <ul class="productionDes">
          <li>工艺模型名称：#工艺模型名称# </li>
          <li>工艺模型版本名称：#工艺模型版本名称#</li>
          <li>工艺版本号：#工艺版本号#</li>
          <li>产出物名称：#产出物名称# </li>
          <li>产品类型：#半成品/成品# </li>
          <li>产品单位：#单位#</li>
          <li>产品理论产出：#理论值#</li>
        </ul>
      </div>
    </div>
    <div class="mt-3 el-card box-card is-always-shadow stepContent">
      <div class="el-card__header fz16">BOM——列表视图
      </div>
      <div class="el-card__body">
        <el-table :data="tableData" border row-key="id">
          <el-table-column prop="date" label="日期" sortable width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" sortable width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.produtionBOM {
  padding: 20px;
  .content {
    position: relative;
    box-sizing: border-box;
    .productionDes {
      box-sizing: border-box;
      li {
        width: 260px;
        height: 30px;
        line-height: 30px;
        float: left;
        &:nth-last-child(1){
        margin-bottom: 20px;

      }
        
      }
      
    }
  }
}
</style>