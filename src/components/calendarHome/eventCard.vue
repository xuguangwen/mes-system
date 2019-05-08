/*
 * @Author: xgw 
 * @Date: 2019-03-20 15:49:10 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-03-20 19:56:50
 */
<!--日历里边的日程提醒显示的事件-->
<template>
  <p class="event-item" :class="cssClasses" @click="$emit('click', event, $event)">
    <slot :event="event" v-if="showTitle">
      {{ event.title }}
    </slot>
  </p>
</template>
<script>
import moment from "moment";
export default {
  props: ["event", "date", "firstDay"],
  computed: {
    cssClasses() {
      let cssClasses = this.event.cssClass;

      if (!Array.isArray(cssClasses)) {
        cssClasses = [cssClasses];
      } else {
        cssClasses = Array.from(cssClasses);
      }

      if (this.start.isSame(this.date, "day")) {
        cssClasses.push("is-start");
      }

      if (this.end.isSame(this.date, "day")) {
        cssClasses.push("is-end");
      }

      if (!this.event.isShow) {
        cssClasses.push("is-opacity");
      }

      return cssClasses.join(" ");
    },
    showTitle() {
      return (
        this.date.day() == this.firstDay || this.start.isSame(this.date, "day")
      );
    },
    start() {
      return moment(this.event.start);
    },
    end() {
      return moment(this.event.end);
    }
  }
};
</script>