/*
 * @Author: xgw 
 * @Date: 2019-01-04 17:30:25 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-18 11:39:49
 */
<!--计划排程甘特图-->
<template>
  <div class="planSchedule">
    <div class="planScheduleTop  after">
      <div class="block">
        <span class="pr-2">时间段选择</span>
        <el-date-picker v-model="timeQuantum" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="productionBar ">
        <span class="pr-2">时间线间隔</span>
        <el-select v-model="interval" placeholder="请选择时间间隔" @change='selectInterval'>
          <el-option v-for="item in intervalOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="chartBox">
      <div class="leftBox">
        <div class="one">
          <p class="dec"><span class="pr-2">说明</span><span class="el-icon-question"></span></p>
        </div>
        <!-- 左侧计划列表 -->
        <div class="two noScroll" ref="planScroll">
          <ul>
            <li v-for="(item,index) in EUList" :key="index" :style="{height:(40*item.planList.length)+'px',lineHeight:(40*item.planList.length-20)+'px'}">{{item.unit_name}}</li>
          </ul>
        </div>
        <div class="three"></div>
      </div>
      <!-- 时间线 -->
      <div class="rightBox">
        <div class="one hasScroll" ref="timeScroll">
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
          <div class="EU" v-for="(item,index) in EUList" :key="index">
            <div class="planList" v-for="(a,b) in item.planList" :key="b" :style="{position:'relative'}">
              <!-- 计划开始辅助线 -->
              <div :class="a.hasNowPlan==='3'?'urgency': (a.hasNowPlan==='1'?'nowPlanColor':'normal')" :style="{width:a.planWidth+'px',marginLeft:a.planMarginLeft+'px', zIndex: 1, height: '20px', position:'relative',top:'0px'}" v-drag="{state:a.hasNowPlan}">
                {{a.name}}
              </div>
            </div>
          </div>
        </div>
        <div class="three">
          <!--图的标识 -->
          <ul class="planBox before after">
            <li class="name">生产iphone的计划A</li>
            <li class="name">生产iphone手机壳计划B</li>
            <li class="name">生产iphone充电线的计划C</li>
          </ul>
          <div class="chartExplain before after">
            <div class="name">正常：
              <span class="model normal">&nbsp;</span>
            </div>
            <div class="name">紧急：
              <span class="model urgency">&nbsp;</span>
            </div>
            <div class="name">当前计划：
              <span class="model nowPlanColor">&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import planSchedule from "@/assets/json/schedule";
export default {
  name: "planSchedule",
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
      EUList: [
        {
          unit_name: "执行单元A",
          planList: [
            {
              plan_id: "1",
              name: "生产iphone的计划A",
              hasNowPlan: "0",
              planWidth: 300,
              planMarginLeft: 80
            },
            {
              plan_id: "2",
              name: "生产iphone手机壳的计划B",
              hasNowPlan: "1",
              planWidth: 400,
              planMarginLeft: 180
            },
            {
              plan_id: "3",
              name: "生产iphone充电线的计划C",
              hasNowPlan: "3",
              planWidth: 200,
              planMarginLeft: 300
            }
          ]
        },
        {
          unit_name: "执行单元B",
          planList: [
            {
              plan_id: "1",
              name: "生产iphone的计划A",
              hasNowPlan: "0",
              planWidth: 300,
              planMarginLeft: 80
            },
            {
              plan_id: "2",
              name: "生产iphone手机壳的计划B",
              hasNowPlan: "1",
              planWidth: 400,
              planMarginLeft: 180
            },
            {
              plan_id: "3",
              name: "生产iphone充电线的计划C",
              hasNowPlan: "3",
              planWidth: 200,
              planMarginLeft: 300
            }
          ]
        },
        {
          unit_name: "执行单元C",
          planList: [
            {
              plan_id: "1",
              name: "生产iphone的计划A",
              hasNowPlan: "0",
              planWidth: 300,
              planMarginLeft: 80
            },
            {
              plan_id: "2",
              name: "生产iphone手机壳的计划B",
              hasNowPlan: "1",
              planWidth: 400,
              planMarginLeft: 180
            },
            {
              plan_id: "3",
              name: "生产iphone充电线的计划C",
              hasNowPlan: "3",
              planWidth: 200,
              planMarginLeft: 300
            }
          ]
        }
      ]
    };
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function(el, binding) {
        let odiv = el; //获取当前元素
        //当前计划
        console.log(binding.value.state);
        if (binding.value.state === "1") {
          odiv.onmousedown = e => {
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;

            document.onmousemove = e => {
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX;
              let top = e.clientY - disY;

              //移动当前元素
              odiv.style.left = left + "px";

              //只能在X轴上移动
              // odiv.style.top = top + "px";
            };
            document.onmouseup = e => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        } else {
          return false;
        }
      }
    }
  },
  mounted() {
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
    //设置默认时间，当前往前7天
    deTimeSection() {
      let sDate = new Date("2018-08-10");
      let eDate = new Date(sDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      this.timeQuantum = [sDate, eDate];
      //画刻度线
      this.drawingScale(sDate, eDate);
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
    //选择时间间隔
    selectInterval() {
      //重新画刻度线
      this.drawingScale(this.timeQuantum[0], this.timeQuantum[1]);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/vars.scss";

.planSchedule {
  .normal {
    background-color: $color-success;
  }
  .urgency {
    background-color: $color-danger;
  }
  .nowPlanColor {
    background-color: $color-primary;
  }

  .planScheduleTop {
    padding: 0 20px;
    width: 100%;
    height: 60px;
    background-color: $content-top;
    color: $color-white;
    .block {
      float: left;
      height: 60px;
      line-height: 60px;
      width: 500px;
    }
    .productionBar {
      float: left;
      line-height: 60px;
    }
  }
  .chartBox {
    width: 100%;
    height: -moz-calc(100vh - 180px);
    height: -webkit-calc(100vh - 180px);
    height: calc(100vh - 180px);
    .leftBox {
      width: 200px;
      float: left;
      background-color: $content-left;
      .dec {
        text-align: center;
        line-height: 60px;
      }
      .one,
      .three {
        width: 100%;
        height: 60px;
      }
      .two {
        /*重点*/
        width: 100%;
        height: -moz-calc(100vh - 300px);
        height: -webkit-calc(100vh - 300px);
        height: calc(100vh - 300px);
        overflow: auto;
        ul {
          li {
            text-align: center;
            padding: 10px 0 9px 10px;
            // height: 40px;
            border-bottom: 1px solid #cccccc;
            &:hover {
              color: $color-active;
              cursor: pointer;
            }
          }
        }
      }
    }
    .rightBox {
      float: left;
      width: -moz-calc(100% - 200px);
      width: -webkit-calc(100% - 200px);
      width: calc(100% - 200px);
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
        height: -moz-calc(100vh - 300px);
        height: -webkit-calc(100vh - 300px);
        height: calc(100vh - 300px);
        overflow: auto; /*重点*/
        .EU {
          box-sizing: content-box;
          .planList {
            padding: 10px 0;
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
          }
        }
      }
      .three {
        width: 100%;
        height: 60px;
        .planBox {
          height: 20px;
          li {
            float: left;
            padding: 0 10px;
          }
        }
        .chartExplain {
          position: fixed;
          bottom: 10px;
          left: 400px;
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
}
</style>
