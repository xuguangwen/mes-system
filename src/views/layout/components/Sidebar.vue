/*
 * @Author: xgw 
 * @Date: 2019-01-03 17:32:28 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-04 11:24:45
 */

<template>
    <el-aside class="Menu hasScroll" width="200px">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    </el-aside>
</template>

<script>
import bus from "@/components/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-setting",
          index: "home",
          title: "系统首页"
        },
        {
          icon: "el-icon-setting",
          index: "tabs",
          title: "tab选项卡"
        },
        {
          icon: "el-icon-setting",
          index: "table",
          title: "表格"
        },
        {
          icon: "el-icon-setting",
          index: "3",
          title: "表单相关",
          subs: [
            {
              index: "form",
              title: "基本表单"
            },
            {
              index: "3-2",
              title: "三级菜单",
              subs: [
                {
                  icon: "el-icon-setting",
                  index: "drag",
                  title: "拖拽列表"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style lang="scss">
@import "@/styles/vars.scss";
.Menu {
  overflow-x: hidden;
    height: -moz-calc(100vh - 70px);
    height: -webkit-calc(100vh - 70px);
    height: calc(100vh - 70px);
  .el-menu {
    height: 100%;
    background-color: $color-menu;
    .el-submenu__title {
      color: $color-white;
      &:hover {
        background-color: $color-primary;
      }
      i {
        color: $color-white;
      }
    }
    .el-menu-item {
      color: $color-white;
    }
    .el-menu-item:hover,
    .el-menu-item:focus {
      background-color: $color-primary;
    }
  }
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 180px;
}
.sidebar > ul {
  height: 100%;
}
</style>
