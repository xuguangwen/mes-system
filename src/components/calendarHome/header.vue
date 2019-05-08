/*
 * @Author: xgw 
 * @Date: 2019-03-20 15:50:25 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-03-20 15:51:25
 */
<!--日历头部的显示，下拉框，左右箭头事件-->
<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left">
      </slot>
    </div>
    <div class="header-center">
      <span class="prev-month iconfont icon-fanhui" @click.stop="goPrev"></span>
      <!-- <span class="title">{{title}}</span> -->
      <el-select v-model="value" @change="changeselectYear" style="width:100px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value1" @change="changeselectMonth" style="width:100px;">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="next-month iconfont icon-gengduo" @click.stop="goNext"></span>
    </div>
    <div class="StateThree">
      <!-- <div class="CircleData FirstGreen"></div>
      <div class="StateFirst">数据完整</div>
      <div class="CircleData FirstYellow"></div>
      <div class="StateSecond">数据残缺</div> -->
    </div>
    <div class="header-right">
      <slot name="header-right">
      </slot>
    </div>
  </div>
</template>
<script>
// import dateFunc from './dateFunc'
import moment from "moment";

export default {
  props: {
    currentMonth: {},
    titleFormat: {},
    firstDay: {},
    monthNames: {},
    locale: {}
  },
  data() {
    return {
      leftArrow: "<",
      rightArrow: ">",
      options: [],
      options1: [
        {
          value: "01月",
          label: "01月"
        },
        {
          value: "02月",
          label: "02月"
        },
        {
          value: "03月",
          label: "03月"
        },
        {
          value: "04月",
          label: "04月"
        },
        {
          value: "05月",
          label: "05月"
        },
        {
          value: "06月",
          label: "06月"
        },
        {
          value: "07月",
          label: "07月"
        },
        {
          value: "08月",
          label: "08月"
        },
        {
          value: "09月",
          label: "09月"
        },
        {
          value: "10月",
          label: "10月"
        },
        {
          value: "11月",
          label: "11月"
        },
        {
          value: "12月",
          label: "12月"
        }
      ],
      value: "",
      value1: ""
    };
  },
  mounted() {
    this.changetitle();
    this.changYear();
  },
  computed: {
    title() {
      if (!this.currentMonth) return;
      return this.currentMonth
        .locale(this.locale)
        .format("YYYY" + "年" + "MM" + "月");
    }
  },
  methods: {
    changetitle() {
      this.value = this.title.substring(0, 5);
      this.value1 = this.title.substring(5, 8);
    },
    changYear() {
      let YearArray = [];
      for (var i = 1901; i <= 2100; i++) {
        let YearJson = {};
        YearJson.value = i + "年";
        YearJson.lable = i + "年";
        YearArray.push(YearJson);
      }
      this.options = YearArray;
    },
    goPrev() {
      var newMonth = moment(this.currentMonth)
        .subtract(1, "months")
        .startOf("month");
      this.$emit("change", newMonth);
      /*setTimeout(() => {
      this.changetitle();
      }, 1);*/
      this.value = newMonth
        .format("YYYY" + "年" + "MM" + "月" + "DD")
        .substring(0, 5);
      this.value1 = newMonth
        .format("YYYY" + "年" + "MM" + "月" + "DD")
        .substring(5, 8);
    },
    goNext() {
      var newMonth = moment(this.currentMonth)
        .add(1, "months")
        .startOf("month");
      this.$emit("change", newMonth);
      /*setTimeout(() => {
      this.changetitle();
      }, 1);*/
      this.value = newMonth
        .format("YYYY" + "年" + "MM" + "月" + "DD")
        .substring(0, 5);
      this.value1 = newMonth
        .format("YYYY" + "年" + "MM" + "月" + "DD")
        .substring(5, 8);
    },
    changeselectYear(val) {
      let nowTime = val + this.value1;
      var moment123 = moment(nowTime, "YYYY-MM-DD HH:mm:ss");
      this.$emit("change", moment123);
    },
    changeselectMonth(val) {
      let nowTime = this.value + val;
      var moment123 = moment(nowTime, "YYYY-MM-DD HH:mm:ss");
      this.$emit("change", moment123);
    }
  }
};
</script>
<style lang="scss">
.full-calendar-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  .header-left,
  .header-right {
    flex: 0;
  }
  .header-center {
    flex: 3;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    flex-direction: column;
    align-items: center;
    .title {
      margin: 0 10px;
      font-size: 22px;
      font-weight: bold;
      color: #797979;
    }
    .prev-month,
    .next-month {
      cursor: pointer;
    }
    .prev-month {
      float: left;
      margin-left: 40px;
    }
    .next-month {
      float: right;
      margin-right: 40px;
    }
  }
  .StateThree {
    width: 100%;
    height: 40px;
    display: flex;
    // flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    div {
      margin: 0px 5px;
    }
    .FirstGreen {
      background: #accf81;
    }
    .FirstYellow {
      background: #f9a101;
    }
    .CircleData {
      width: 8px;
      height: 8px;
      border-radius: 100%;
    }
  }
}
</style>