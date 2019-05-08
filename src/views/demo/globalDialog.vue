<template>
  <div class="globalDialog">
    <h1 class="center">这里测试全局Dialog调用</h1>
    <div class="test">
      <span>测试input全局弹出：</span>
      <el-input placeholder="选择员工" v-model="staffName" class="pointer" readonly @click.native="getStaff"></el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      staffName: ""
    };
  },
  mounted() {},
  methods: {
    // 获取供应商
    getStaff() {
      this.$mesStaff
        .show("选择员工", {
          reRender: true, // 是否重新渲染
          multiple: false, // 是否多选
          params: {
            // 额外的参数
            keyword: ""
          }
        })
        .then(res => {
          console.log(res.rows[0]);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.globalDialog{
  .test{
    width: 200px;
    margin: 20 auto;
  }
}

</style>

