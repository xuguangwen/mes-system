/*
 * @Author: xgw 
 * @Date: 2019-05-05 14:55:05 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-08 17:41:57
 */
<!--绘制生产路径-->
<template>
  <div class="drawProductionPath">
    <craft-path ref="craftPath" :name="'2'" :nodeDataArray="nodeDataArray" :linkDataArray="linkDataArray"></craft-path>
    <div class="my-5"></div>
    <craft-path ref="craftPath" :name="'3'" :nodeDataArray="nodeDataArray" :linkDataArray="linkDataArray" :pattern="true" @sendPaletteData="receivePalettData"></craft-path>
  </div>
</template>

<script>
import craftPath from "@/components/gojsChart/flowChart";
export default {
  name:"drawProductionPath",
  components:{
    craftPath
  },
  data(){
    return{
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
    }
  },
  methods:{
    receivePalettData(obj){
      console.log(obj);

    }
  }

}
</script>

<style>

</style>
