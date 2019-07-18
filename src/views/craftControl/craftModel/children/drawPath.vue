/*
 * @Author: xgw 
 * @Date: 2019-05-15 09:02:43 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 11:38:14
 */
<template>
  <div class="drawPath">
    <div class="switcher">
      <el-button type="primary" class="ml-3" @click="$router.push({path:'/craftControl/craftModel/draft'})">返 回</el-button>
      <el-button type="primary" @click="SubmitNameForm">保 存</el-button>
    </div>
    <div class="content">
      <div class="nameForm">
        <el-form :inline="true" :model="nameForm" :rules="rules" ref="nameForm">
          <el-form-item label="工艺路径版本名称" prop="name">
            <el-input v-model="nameForm.name" placeholder=" 请输入不超过15个字符"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="mt-3 el-card box-card is-always-shadow">
        <div class="el-card__body">
          <craft-path ref="craftPath" :name="'craftDraw'" :nodeDataArray="nodeDataArray" :linkDataArray="linkDataArray" :pattern="true" :grid="true" :palette="true" @sendPaletteData="receivePalettData"></craft-path>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import craftPath from "@/components/gojsChart/flowChart";
export default {
  name:"basic",
  components:{
    craftPath
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
    SubmitNameForm() {
      this.$refs.nameForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    receivePalettData(obj){
      console.log(obj)
    }
  }
};
</script>

<style lang="scss" scoped>
.drawPath {
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
