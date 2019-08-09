/*
 * @Author: xgw 
 * @Date: 2019-01-04 17:30:25 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-17 16:31:20
 */
<!--计划进度图-->
<template>
  <div class="productionPlan">
    <div class="planChart  after">
      <div class="title">
        <div class="block">
          <p class="timeQuantum">时间段选择</p>
          <el-date-picker v-model="timeQuantum" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="productionBar ">
          <p class="timeFilter">时间线间隔</p>
          <el-select v-model="interval" placeholder="请选择时间间隔" @change='selectInterval'>
            <el-option v-for="item in intervalOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="chartBox">
      <div class="leftBox">
        <div class="one"></div>
        <!-- 左侧计划列表 -->
        <div class="two noScroll" ref="planScroll">
          <ul>
            <li v-for="(item,index) in planList" :key="index" v-cloak @mouseover="showPlan(index)" :style="{'color':item.plan_id==activeCurrent?'#00e4bd':''}">{{item.name}}</li>
          </ul>
        </div>
        <div class="three"></div>
      </div>
      <!-- 时间线 -->
      <div class="rightBox">
        <div class="one noScroll" ref="timeScroll">
          <ul class="day">
            <li v-for="(day,dayindex) in dayList" :key="dayindex" ref="getLi">
              <p>{{day}}</p>
              <ul>
                <li v-for="(item ,index) in (24/interval)" :key="index">{{index*interval+':00'}}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="two hasScroll" ref="lineScroll">
          <!-- 进度图 -->
          <!-- 进度图 -->
          <div class="planList" @click="openDialog(index)" v-for="(item,index) in lineList" :key="index" @mouseover="getCurrentProcess(item)" @mouseout="outCurrentProcess(item)">
            <!-- 计划 -->
            <span class="subline" :style="{marginLeft:(item.planMarginLeft-1)+'px',height:35+(index*40)+'px',top:-15-(index*40)+'px'}" v-show="item.planSubline"></span>
            <div class="plan planColor" :style="{width:item.planWidth+'px',marginLeft:item.planMarginLeft+'px'}" @mouseover="getPostion(item,index,0)" @mouseout="outPostion(item,index,0)">
            </div>
            <span class="subline" :style="{marginLeft:(item.planMarginLeft+item.planWidth-1)+'px',height:35+(index*40)+'px',top:-15-(index*40)+'px'}" v-show="item.planSubline"></span>
            <!-- 计划 -->
            <!-- 实际 -->
            <span class="subline" :style="{marginLeft:(item.actualMarginLeft-1)+'px',height:30+(index*40)+'px',top:-15-(index*40)+'px'}" v-show="item.actualSubline"></span>
            <div class="actual actualColor" :style="{width:item.actualWidth+'px',marginLeft:item.actualMarginLeft+'px'}" @mouseover="getPostion(item,index,1)" @mouseout="outPostion(item,index,1)"></div>
            <span class="subline" :style="{marginLeft:(item.actualMarginLeft+item.actualWidth-1)+'px',height:30+(index*40)+'px',top:-15-(index*40)+'px'}" v-show="item.actualSubline"></span>
            <!-- 实际 -->
            <!-- 等待 -->
            <div class="commonStyle awaitColor" :style="{width:item.awaitWidth+'px',marginLeft:item.awaitMarginLeft+'px',zIndex:3}"></div>
            <!-- 暂停 -->
            <div class="commonStyle pauseColor" :style="{width:item1.width+'px',marginLeft:item1.marginLeft+'px',zIndex:4+index1}" v-for="(item1,index1) in item.pause" :key="index1"></div>
          </div>
          <!-- 附加信息tool -->
          <div class="toolBox" ref="toolBox">
            <p>生产计划编号：{{nowplanTxt.plan_batch}}</p>
            <p>产品名称：{{nowplanTxt.product_name}}</p>
            <p>负责人：{{nowplanTxt.plan_responsible}}</p>
            <p>排产量：{{ nowplanTxt.plan_output }}</p>
            <p v-html="'计划时间：'+nowplanTxt.planTime"></p>
            <p v-if="nowplanTxt.actualTime" v-html="'实际时间：'+nowplanTxt.actualTime"></p>
            <p v-if="nowplanTxt.plan_actual_output||nowplanTxt.plan_actual_output===0">实际产出量：{{nowplanTxt.plan_actual_output}}</p>
            <p>生产进度：{{nowplanTxt.craftProductionSchedule}}</p>
          </div>
        </div>
        <div class="three">
          <!--图的标识 -->
          <div class="chartExplain before after">
            <div class="name">计划：
              <span class="model planColor">&nbsp;</span>
            </div>
            <div class="name">实际：
              <span class="model actualColor">&nbsp;</span>
            </div>
            <div class="name">等待：
              <span class="model awaitColor">&nbsp;</span>
            </div>
            <div class="name">暂停:
              <span class="model pauseColor">&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--进度图弹出-->
    <el-dialog :title="currentPlan ? currentPlan.name : ''" :visible.sync="gantDialog" class="ganttDialog">
      <div id="ganttChart"></div>
      <span slot="footer" class="dialog-footer">
        <div class="name">预计时间：
          <span class="model planColor">&nbsp;</span>
        </div>
        <div class="name">实际时间：
          <span class="model actualColor">&nbsp;</span>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import utils from "@/utils/index";
import planList from "@/assets/json/planList";
import { echartsUrl } from "@/api/cdn.js";

export default {
  name: "productionPlan",
  data() {
    return {
      timeQuantum: [], //时间段选择
      intervalOptions: [
        {
          value: 3,
          label: "3小时"
        },
        {
          value: 6,
          label: "6小时"
        },
        {
          value: 8,
          label: "8小时"
        },
        {
          value: 12,
          label: "12小时"
        },
        {
          value: 24,
          label: "24小时"
        }
      ],
      dayList: [], //天数列表
      interval: 6, //默认时间线间隔
      planList: planList,
      lineList: [], //图的数据里面包含四个时间转化的2段线，一个辅助线的false，一个弹出
      nowplanTxt: {
        product_name: "", //产品名称
        plan_batch: "", //批次
        planTime: "", //计划时间
        actualTime: "", //实际时间
        plan_responsible: "", //负责人
        craftProductionSchedule: "", //进度
        plan_actual_output: "", //实际产出量
        plan_output: "" //排产量
      }, //当前批次信息
      currentPlan: {}, // 当前选中的plan
      activeCurrent: "", //当前高亮

      gantDialog: false //甘特图弹出
    };
  },
  mounted() {
    this.loadjs(echartsUrl).then(() => {
      //加载完之后你可以处理一下事
    });
    this.deTimeSection();
    //创建监听事件
    this.$nextTick(() => {
      let planScroll = this.$refs.planScroll,
        lineScroll = this.$refs.lineScroll,
        timeScroll = this.$refs.timeScroll;
      // 监听这个dom的scroll事件
      lineScroll.addEventListener(
        "scroll",
        e => {
          planScroll.scrollTo(0, lineScroll.scrollTop);
          timeScroll.scrollTo(lineScroll.scrollLeft, 0);
        },
        false
      );
    });
  },
  methods: {
    //滚动监听事件
    defaultTime(date) {
      let Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate();
      M = M < 10 ? `0${M}` : M;
      D = D < 10 ? `0${D}` : D;
      return `${Y}-${M}-${D}`;
    },
    //设置默认时间，当前往前7天
    deTimeSection() {
      let sDate = new Date("2018-08-10");
      let eDate = new Date(sDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      this.timeQuantum = [sDate, eDate];
      //画刻度线
      this.drawingScale("2018-08-10 00:00:00", "2018-08-20 24:00:00");
      //画图
      this.drawLine(this.planList);
    },
    //画刻度线
    drawingScale(minTime, maxTime) {
      let a = new Date(minTime).getTime();
      let b = new Date(maxTime).getTime();
      let dayNum = (b - a) / (24 * 60 * 60 * 1000);
      let data = [];
      for (let index = 0; index <= dayNum; index++) {
        let time = a + 24 * 60 * 60 * 1000 * index;
        data[index] =
          new Date(time).getMonth() + 1 + "/" + new Date(time).getDate();
      }
      this.dayList = data;
    },
    //画进度图,TimeList:[{plan_start_time: "2018-08-24 06:00:00",plan_end_time: "2018-08-26 12:00:00",actual_start_time: "2018-08-24 09:20:00",actual_end_time: "2018-08-25 16:00:00"}]
    drawLine(timeList) {
      this.lineList = [];
      this.$nextTick(() => {
        //这里开始处理生产一条条的线[{planWidth:'',planMarginLeft:'',actualWidth:'',actualMarginLeft:''}]
        if (timeList.length == 0) {
          return false;
        } else {
          timeList.forEach((n, i) => {
            this.lineList.push(this.timeSwitchPx(n));
          });
        }
      });
    },
    //选择时间间隔
    selectInterval() {
      //重新画刻度线
      this.drawLine(this.planList);
    },
    timeNum(str) {
      return new Date(str).getTime();
    },
    //处理方法时间对象转化成长px
    timeSwitchPx(obj) {
      //请返回数组内最小和最大时间
      let maxTime = "",
        minTime = "",
        max = [],
        min = [];
      this.planList.forEach((n, i) => {
        //去数组内的最大时间：结束时间内最大的。最小时间：开始时间内最小的
        max.push(new Date(n.actual_end_time), new Date(n.plan_end_time));
        min.push(new Date(n.actual_start_time), new Date(n.plan_start_time));
      });
      maxTime = max.sort((a, b) => {
        return a - b;
      })[max.length - 1];
      minTime = min.sort((a, b) => {
        return a - b;
      })[0];
      //最小时间要到00:00:00，最大时间要到24：00：00
      maxTime =
        utils.formatDate.format(new Date(maxTime), "yyyy-MM-dd") +
        " " +
        "24:00:00";
      minTime =
        utils.formatDate.format(new Date(minTime), "yyyy-MM-dd") +
        " " +
        "00:00:00";
      let liDom = this.$refs.getLi,
        px = {},
        ulGetWidth = liDom[0].clientWidth * (this.dayList.length - 1), //时间段选择的区间(uldom的总长度)
        k = new Date(maxTime).getTime() / 1000,
        j = new Date(minTime).getTime() / 1000,
        //时间段选择的区间分为多少s
        secondNum = k - j,
        //每1s占用多少px
        rate = ulGetWidth / secondNum,
        //一个基准
        aT = new Date(minTime).getTime(),
        //从这个基准去算
        aS = new Date(obj.plan_start_time).getTime(),
        aE = new Date(obj.plan_end_time).getTime(),
        bS = new Date(obj.actual_start_time).getTime(),
        bE = new Date(obj.actual_end_time).getTime();
      //计划
      px.planWidth =
        ((this.timeNum(obj.plan_end_time) - this.timeNum(obj.plan_start_time)) /
          1000) *
        rate;
      px.planMarginLeft =
        ((this.timeNum(obj.plan_start_time) - aT) / 1000) * rate;
      //实际
      px.actualWidth =
        ((this.timeNum(obj.actual_end_time) -
          this.timeNum(obj.actual_start_time)) /
          1000) *
        rate;
      px.actualMarginLeft =
        ((this.timeNum(obj.actual_start_time) - aT) / 1000) * rate;
      //暂停
      px.pause = [];
      if (obj.plan_pause.length > 0) {
        obj.plan_pause.forEach(n => {
          px.pause.push({
            marginLeft: ((this.timeNum(n.pause_start_time) - aT) / 1000) * rate,
            width:
              ((this.timeNum(n.pause_end_time) -
                this.timeNum(n.pause_start_time)) /
                1000) *
              rate
          });
        });
      } else {
        px.pause = [];
      }
      //等待:实际开始时间大于计划开始时间
      if (
        this.timeNum(obj.actual_start_time) > this.timeNum(obj.plan_start_time)
      ) {
        //有等待时间
        px.awaitWidth =
          ((this.timeNum(obj.actual_start_time) -
            this.timeNum(obj.plan_start_time)) /
            1000) *
          rate;
        px.awaitMarginLeft = px.planMarginLeft;
      } else {
        //无等待时间
        px.awaitWidth = 0;
        px.awaitMarginLeft = 0;
      }
      px.planSubline = false; //计划辅助线
      px.actualSubline = false; //实际辅助线
      px.id = obj.plan_id; //计划id
      return px;
    },
    //tooltip跟随鼠标,辅助线显示
    getPostion(item, index, tag) {
      let dom = this.$refs.toolBox;
      dom.style.display = "block";
      switch (tag) {
        case 0:
          item.planSubline = true;
          break;
        case 1:
          item.actualSubline = true;

          break;
        default:
          break;
      }
      this.showPlan(index);
    },
    //鼠标离开
    outPostion(item, index, tag) {
      let dom = this.$refs.toolBox;
      dom.style.display = "none";
      switch (tag) {
        case 0:
          item.planSubline = false;

          break;
        case 1:
          item.actualSubline = false;

          break;
        default:
          break;
      }
    },
    //选中的那个批次
    getCurrentProcess(item) {
      this.activeCurrent = item.id;
      let dom = this.$refs.toolBox;
      dom.style.position = "absolute";
      dom.style.left = event.clientX - 300 + "px";
      dom.style.top = event.clientY - 60 + "px";
    },
    outCurrentProcess(item) {
      let dom = this.$refs.toolBox;
      let a = this.activeCurrent;
      return (this.activeCurrent = item.id == a ? "" : a);
    },
    //移入显示批次的信息
    showPlan(index) {
      this.nowplanTxt.plan_batch = this.planList[index].plan_batch;
      this.nowplanTxt.planTime =
        this.planList[index].plan_start_time +
        "&nbsp;至&nbsp;" +
        this.planList[index].plan_end_time;
      this.nowplanTxt.actualTime = this.planList[index].actual_start_time
        ? this.planList[index].actual_start_time +
          "&nbsp;至&nbsp;" +
          this.planList[index].actual_end_time
        : "";
      this.nowplanTxt.plan_responsible = this.planList[index].plan_responsible;
      this.nowplanTxt.craftProductionSchedule = this.planList[
        index
      ].craftProductionSchedule;
      this.nowplanTxt.plan_actual_output = this.planList[
        index
      ].plan_actual_output;
      this.nowplanTxt.plan_output = this.planList[index].plan_output;
      this.nowplanTxt.product_name = this.planList[index].name;
    },
    //弹出甘特图
    openDialog(index) {
      this.currentPlan = Object.assign({}, this.planList[index]);
      this.gantDialog = true;
      this.$nextTick(() => {
        this.drawGanttChart();
      });
      //拼凑数据格式
    },
    //画甘特图
    drawGanttChart() {
      let obj = this.currentPlan;
      let EUName = [], //执行单元
        scheduledS = [], //预计开始时间数组
        scheduledE = [], //预计结束时间数组
        actualS = [], //实际开始
        actualE = []; //实际结束
      //执行单元维度的甘特图
      obj.planProductionUnits.forEach(n => {
        EUName.push(n.execute_unit_name);
        scheduledS.push(
          utils.formatDate.format(
            new Date(n.unit_scheduled_start_time),
            "yyyy-MM-dd hh:mm:ss"
          )
        );
        scheduledE.push(
          utils.formatDate.format(
            new Date(n.unit_scheduled_end_time),
            "yyyy-MM-dd hh:mm:ss"
          )
        );
        actualS.push(
          n.unit_actual_start_time
            ? utils.formatDate.format(
                new Date(n.unit_actual_start_time),
                "yyy-MM-dd hh:mm:ss"
              )
            : ""
        );
        actualE.push(
          n.unit_actual_end_time
            ? utils.formatDate.format(
                new Date(n.unit_actual_end_time),
                "yyyy-MM-dd hh:mm:ss"
              )
            : ""
        );
      });
      console.log(scheduledS, scheduledE, actualS, actualE);
      // 基于准备好的dmo，初始化echarts实例
      var myChart = echarts.init(document.getElementById("ganttChart"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "执行单元进度图",
          left: 10
        },
        color: ["#b4efd9", "#00e4bd"],
        legend: {
          data: ["", ""]
        },
        grid: {
          containLabel: true,
          left: 20
        },
        xAxis: {
          type: "time"
        },
        yAxis: {
          data: EUName
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var res = params[0].name + "</br>"; //执行单元名
            var date0 = params[0].data; //预计开始时间
            var date1 = params[1].data; //预计结束时间
            var date2 = params[2].data; //实际开始时间
            var date3 = params[3].data; //实际结束时间
            res +=
              params[0].seriesName + ":</br>" + date0 + "~" + date1 + "</br>";
            res +=
              date2 === ""
                ? ""
                : params[2].seriesName +
                  ":</br>" +
                  date2 +
                  "~" +
                  date3 +
                  "</br>";
            return res;
          }
        },
        series: [
          //计划开始时间
          //说明：stack有几种代表一个‘【】几条线X轴
          {
            name: "预计时间",
            type: "bar",
            stack: "test1",
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: scheduledS
          },
          //计划完成时间
          {
            name: "预计时间",
            type: "bar",
            stack: "test1",
            data: scheduledE
          },
          //实际开始时间
          {
            name: "实际时间",
            type: "bar",
            stack: "test2",
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: actualS
          },
          //实际完成时间
          {
            name: "实际时间",
            type: "bar",
            stack: "test2",
            data: actualE
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      this.echartsH = EUName.length * 35 + 250; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
      myChart.getDom().style.height = this.echartsH + "px";
      myChart.getDom().childNodes[0].style.height = this.echartsH + "px";
      myChart
        .getDom()
        .childNodes[0].childNodes[0].setAttribute("height", this.echartsH);
      myChart.getDom().childNodes[0].childNodes[0].style.height =
        this.echartsH + "px";
      myChart.resize();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/vars.scss";
.productionPlan {
  .planColor {
    background-color: $color-plan;
  }
  .actualColor {
    background-color: $color-primary;
  }
  .awaitColor {
    background-color:$color-menu;
  }
  .pauseColor {
    background-color: $color-warning;
  }
  .planChart {
    .title {
      width: 100%;
      .block {
        float: left;
        width: 300px;
        height: 100px;
        background-color: $content-left;
        .timeQuantum {
          height: 50px;
          width: 100%;
          padding: 20px 10px;
        }
        .el-date-editor--daterange.el-input__inner {
          margin-left: 10px;
          width: 270px;
        }
      }
      .productionBar {
        padding-left: 20px;
        float: left;
        height: 100px;
        width: -moz-calc(100% - 300px);
        width: -webkit-calc(100% - 300px);
        width: calc(100% - 300px);
        overflow-y: auto;
        background-color: $color-plan;
        .timeFilter {
          height: 50px;
          padding: 20px 0px;
        }
      }
    }
  }
  .chartBox {
    width: 100%;
    height: -moz-calc(100vh - 220px);
    height: -webkit-calc(100vh - 220px);
    height: calc(100vh - 220px);
    .leftBox {
      width: 300px;
      float: left;
      background-color: $content-left;
      .one,
      .three {
        width: 100%;
        height: 60px;
      }
      .two {
        /*重点*/
        width: 100%;
        height: -moz-calc(100vh - 340px);
        height: -webkit-calc(100vh - 340px);
        height: calc(100vh - 340px);
        overflow: auto;
        ul {
          li {
            padding: 10px 0 10px 10px;
            height: 40px;
            // border-bottom: 1px solid #cccccc;
            &:hover {
              color: $color-primary;
              cursor: pointer;
            }
          }
        }
      }
    }
    .rightBox {
      float: left;
      width: -moz-calc(100% - 300px);
      width: -webkit-calc(100% - 300px);
      width: calc(100% - 300px);
      .one {
        /*重点*/
        overflow-x: scroll;
        overflow-y: hidden;
        width: 100%;
        height: 60px;
        .day {
          width: 100%;
          display: flex;
          height: 60px;
          li {
            text-align: center;
            height: 20px;
            flex: 1;
            ul {
              margin-top: 5px;
              display: flex;
              li {
                flex: 1;
                box-sizing: content-box;
                min-width: 50px;
                height: 30px;
                border-top: 1px solid #ccc;
                border-right: 1px solid #ccc;
              }
            }
          }
        }
      }
      .two {
        width: 100%;
        height: -moz-calc(100vh - 340px);
        height: -webkit-calc(100vh - 340px);
        height: calc(100vh - 340px);
        overflow: auto; /*重点*/
        .planList {
          padding: 10px 0;
          position: relative;
          &:hover {
            cursor: pointer;
          }
          .subline {
            width: 1px;
            float: left;
            background: #ccc;
            z-index: 10;
            position: absolute;
          }
          .plan {
            z-index: 1;
            height: 20px;
            border-radius: 20px;
          }
          .actual {
            z-index: 2;
            height: 10px;
            border-radius: 10px;
            position: absolute;
            top: 15px;
          }
          .commonStyle {
            height: 10px;
            position: absolute;
            top: 15px;
          }
        }
      }
      .three {
        width: 100%;
        height: 60px;
        .chartExplain {
          position: fixed;
          bottom: 20px;
          left: 500px;
          width: 100%;
          display: inline-block;
          height: 20px;
          .name {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            font-size: 13px;
            padding: 0 10px;
            .model {
              display: inline-block;
              width: 50px;
              height: 20px;
              border-radius: 13px;
            }
          }
        }
      }
    }
  }
  .toolBox {
    z-index: 999;
    color: #fff;
    background: #606266;
    padding: 10px;
    display: none;
    box-sizing: content-box;
  }
  .ganttDialog {
    .name {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      padding: 0 10px;
      .model {
        display: inline-block;
        width: 50px;
        height: 20px;
      }
    }
  }
}
</style>
