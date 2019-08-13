/*
 * @Author: xgw 
 * @Date: 2019-05-06 17:04:38 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-08-13 17:19:34
 */
 
<template>
  <el-row class="px-3 py-3">
    <el-col :span="11">
      <div class="el-card box-card" style="position: relative;">
        <div class="el-card__header">
          日历组件——Excel查询
          <el-button type="text" style="position: absolute;right: 20px;top: 10px;">查看</el-button>
        </div>
        <div class="el-card__body">
          <img :src="require('@/assets/images/calendar1.png')" class="image">
        </div>
      </div>
    </el-col>
    <el-col :span="12" offset="1">
      <div class="el-card box-card" style="position: relative;">
        <div class="el-card__header">
          日历组件——Excel排程
          <el-button type="text" style="position: absolute;right: 20px;top: 10px;">查看</el-button>
        </div>
        <div class="el-card__body">
          <el-carousel :interval="5000" arrow="always" height='400px'>
            <el-carousel-item v-for="(item,index) in 6" :key="index">
              <img :src="require('@/assets/images/calendar/'+(index+1)+'.png')" class="image">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "schedule",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.image {
  vertical-align: middle;
  width: 100%;
  height: 400px;
}
</style>

