<template>
  <div class="wrapper noScroll">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content hasScroll">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "@/views/layout/components/Header.vue";
import vSidebar from "@/views/layout/components/Sidebar.vue";
import vTags from "@/views/layout/components/Tags.vue";
import bus from "@/components/bus.js";
export default {
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/vars.scss";
.wrapper {
  width: 100%;
  height: 100%;
  .content-box {
    height: -moz-calc(100vh - 90px);
    height: -webkit-calc(100vh - 90px);
    height: calc(100vh - 90px);
    position: absolute;
    left: 180px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    background-color: $content-color;
    .content {
      width: auto;
      height: 100%;
      padding:0 10px;
      overflow-y: scroll;
      box-sizing: border-box;
      background-color: $content-color;
    }
  }
  .content-collapse {
    left: 65px;
  }
}
</style>
