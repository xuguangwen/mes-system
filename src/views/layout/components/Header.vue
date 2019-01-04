/*
 * @Author: xgw 
 * @Date: 2019-01-03 17:32:05 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-04 17:24:55
 */

<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">{{$t('mes.systemName')}}</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 中英文 -->
        <div class="lang px-2">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-xgw-language"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toggleLang('cn')" :disabled="$i18n.locale == 'cn'">中文</el-dropdown-item>
              <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale == 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 全屏显示 -->
        <div class="btn-fullscreen px-2" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator px-2"><img :src="require('@/assets/images/admin.png')"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}} <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "@/components/bus";
export default {
  data() {
    return {
      selectValue: "",
      options: [
        {
          value: "cn",
          label: "中文"
        },
        {
          value: "en",
          label: "English"
        }
      ],
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  created() {
    let that = this;
    console.log(localStorage.lang);
    that.selectValue =
      localStorage.lang == undefined ? "cn" : localStorage.lang;
  },

  methods: {
    //语言切换
    langChange(e) {
      console.log(e);
      localStorage.setItem("lang", e);
      this.$i18n.locale = e;
    },
    //2.切换语言
    toggleLang(lang) {
      if (lang == "cn") {
        localStorage.setItem("locale", "cn");
        this.$i18n.locale = localStorage.getItem("locale");
        this.$message({
          message: "切换为中文！",
          type: "success"
        });
      } else if (lang == "en") {
        localStorage.setItem("locale", "en");
        this.$i18n.locale = localStorage.getItem("locale");
        this.$message({
          message: "Switch to English!",
          type: "success"
        });
      }
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/vars.scss";
.header {
  background-color: $color-top;
  width: 100%;
  height: 70px;
  line-height: 70px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
}
.user-avator img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>
