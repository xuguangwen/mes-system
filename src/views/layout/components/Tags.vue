/*
 * @Author: xgw 
 * @Date: 2019-01-03 17:41:56 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-04 10:45:17
 */

<template>
  <div class="tags" v-if="showTags">
    <div class="tagsBox">
      <el-tag closable v-for="(item,index) in tagsList" :key="index" @close=closeTags(index) :type="item.path===$route.fullPath?'success':'info'">
        <router-link :to="item.path">
          {{item.title}}
        </router-link>
      </el-tag>
    </div>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          <span class="px-1">标签选项</span>
          <i class="el-icon-arrow-down"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from "@/components/bus";
export default {
  data() {
    return {
      tagsList: []
    };
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        });
      }
      bus.$emit("tags", this.tagsList);
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);
  }
};
</script>


<style lang="scss">
.tags {
  position: relative;
  height: 50px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  border-bottom:1px solid #d8dce5; 
  .tagsBox {
    box-sizing: border-box;
    padding: 0 5px;
    line-height: 50px;
    width: 100%;
    height: 100%;
    .el-tag + .el-tag {
      margin-left: 10px;
    }
  }
  .tags-close-box {
    position: absolute;
    right: 10px;
    top: 9px;
    box-sizing: border-box;
    text-align: center;
    width: 110px;
    height: 32px;
    font-size: 12px;
  }
}
</style>
