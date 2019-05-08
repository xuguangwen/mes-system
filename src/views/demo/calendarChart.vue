/*
 * @Author: xgw 
 * @Date: 2019-01-19 14:25:49 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-03-20 20:35:55
 */

<template>
  <div>

    <!-- 跟随鼠标指针显示内容，勿删 -->
    <!-- <div class="Valuationtable">
            <div class="RightAlert">
              <div id="Triangle"></div>
              <div id="DeleteTop" @click.stop="deletetip($event)"><span class="iconfont icon-delete"></span></div>
              <div class="DetailedAll" >删除估值表</div>
              <div class="DetailedAll" >删除成交明细</div>
              <div class="DetailedAll" >删除委托明细</div>
              <div class="DetailedAll" >删除委托明细</div>
              <div class="DetailedAll" >删除委托明细</div>
              <div class="DetailedAll" >删除委托明细</div>
            </div>
    </div> -->
    <!-- Calendar   Container -->
    <div class="CalendarContainer">
      <full-calendar class="test-fc" :events="fcEvents" :firstDay='0' locale="zh-cn" :isshoetitlt="1" lang="zh-cn" ref="CalChildren" @changeMonth="changeMonth" @eventClick="eventClick" @dayClick="dayClick" @DayenterFather="DayenterFather" @DayleaveFather="DayleaveFather" @moreClick="moreClick">

      </full-calendar>
    </div>
  </div>
</template>
<script>
import fullCalendar from "@/components/calendarHome/fullCalendar";
let demoEvents = [
  {
    title: "生产iphone8",
    start: "2019-03-12",
    end: "2019-03-21",
    cssClass: "success"
  },
  {
    title: "生产iphoneX",
    start: "2019-03-15",
    end: "2019-03-18",
    cssClass: "danger"
  },
  {
    title: "生产华为P20",
    start: "2019-03-18",
    end: "2019-04-21",
    cssClass: "warning"
  },
  {
    title: "生产华为Mate20",
    start: "2019-03-15",
    end: "2019-07-18",
    cssClass: "info"
  }
];
export default {
  components: {
    "full-calendar": fullCalendar
  },
  data() {
    return {
      fcEvents: demoEvents, //显示在日历格中的事件
      starTime: "",
      endTime: "",
      fileList: []
    };
  },
  mounted() {},
  created() {},
  methods: {
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    dayClick(day, jsEvent, index) {
      console.log(day, jsEvent.target);
      // 跟随鼠标指针显示，勿删
      //    var dx = jsEvent.pageX,
      //        dy = jsEvent.pageY;
      // $('.Valuationtable').css({"display":"block","left":(dx+10)+"px","top":(dy-40)+"px"});
      // let allevent = document.getElementsByClassName("events-day");
      // let alleventBox = document.getElementsByClassName("RightAlert");
      // for (var i = 0; i < allevent.length; i++) {
      //   alleventBox[i].style.display = "none";
      // }
      // if (jsEvent.target.className == "event-box") {
      //   $(jsEvent.target.parentNode)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "EventsTitle") {
      //   $(jsEvent.target.parentNode.parentNode.parentNode)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-cell") {
      //   $(jsEvent.target)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-cell isBgray") {
      //   $(jsEvent.target)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-cell not-cur-month") {
      //   $(jsEvent.target)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-cell not-cur-month isBgray") {
      //   $(jsEvent.target)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-number isCgray") {
      //   $(jsEvent.target.parentNode)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-number") {
      //   $(jsEvent.target.parentNode)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-number today") {
      //   $(jsEvent.target.parentNode)
      //     .find(".RightAlert")
      //     .show();
      // }

      // if (jsEvent.target.className == "day-number not-cur-month isCgray") {
      //   $(jsEvent.target.parentNode)
      //     .find(".RightAlert")
      //     .show();
      // }
      // if (jsEvent.target.className == "day-number not-cur-month") {
      //   $(jsEvent.target.parentNode)
      //     .find(".RightAlert")
      //     .show();
      // }
    },
    DayenterFather(day, jsEvent) {
      jsEvent.target.style.boxShadow = " 0px 6px 18px rgba(0, 0, 0, 0.22)";
    },
    DayleaveFather(day, jsEvent) {
      jsEvent.target.style.boxShadow = "0px 0px 0px 0px #fff";
    },
    moreClick(day, events, jsEvent) {
      console.log("moreCLick", day, events, jsEvent);
    },
    //选择月份
    changeMonth(start, end, current) {
      console.log("切换月份了哦");
      console.log(
        "changeMonth",
        start.format(),
        end.format(),
        current.format()
      );
      let starttime = start.format().slice(0, 10);
      let endtime = end.format().slice(0, 10);
      this.starTime = starttime;
      this.endTime = endtime;
    }
  }
};
</script>
<style lang='scss'>
.home {
  color: red;
}
.otcDialog {
  .el-input__inner {
    padding-right: 25px;
  }
  .el-dialog {
    //height:400px;
  }
  td {
    padding: 0 14px;
    width: 50%;
  }
  .form-parent > form {
    background-color: #fff;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding-bottom: 20px;
    //input {text-align: right;}
  }
  .grid-label {
    white-space: nowrap;
    max-width: 250px;
    word-break: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
    line-height: 20px;
  }
}
.CalendarContainer {
  // background: #ffffff;
  // margin: 0px 20px 0px 20px;
  // box-shadow: 0 3px 7px #ddd;
}
.CalendarSubject {
  margin: 0 20px;
}
.dataTile {
  font-size: 20px;
  /*height: 30px;*/
  line-height: 30px;
  font-weight: bold;
  color: #000;
  padding-right: 30px;
  .titleTextBefore:before {
    position: relative;
    top: 3.5px;
    content: "";
    display: inline-block;
    width: 5px;
    height: 20px;
    background: #f9a101;
    margin: 0 12px 0 0;
  }
}
.FL {
  float: left;
}
.titleVertical {
  width: 5px;
  height: 20px;
  background: #f9a101;
  margin: 5px 12px 0px 10px;
}
// 跟随鼠标指针显示的样式勿删
.Valuationtable {
  display: none;
  position: absolute;
  z-index: 99999;
  background: #000;
  .RightAlert {
    // width: 130px;
    // height: 165px;
    background-color: #f9a101;
    padding: 5px 20px 5px 20px;
    border-radius: 5px;
    z-index: 999999;
  }
  #Triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 15px solid #f9a101;
    border-bottom: 10px solid transparent;
    position: absolute;
    top: 10px;
    left: -15px;
  }

  .DetailedAll {
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: 6px;
    text-align: center;
    color: #fff;
  }

  #DeleteTop {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 3px;
    right: 3px;
    text-align: center;
    line-height: 25px;
    color: #000;
    background: #f3f3f3;
  }
}
</style>