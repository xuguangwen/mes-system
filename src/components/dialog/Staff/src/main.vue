/*
 * @Author: xgw 
 * @Date: 2019-04-20 14:29:13 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-04-20 18:04:28
 */
<template>
  <el-dialog :title="title || '选择员工' " :visible.sync="visible" class="__mes-dialog" width="50%">
    <el-col class="toolbar">
      <el-form :inline="true" @submit.native.prevent class="text-right">
        <el-form-item>
          <el-input v-model="filters.keyWord" placeholder="输入关键字" clearable @clear="selectInput" @change="selectInput" @keyup.native.enter="selectInput">
            <el-button slot="append" icon="el-icon-search" @click.native="selectInput"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表 start-->
    <el-table :data="tableData"  ref="multipleTable" @select="handleRowSelect" @select-all="handleSelectAll" @selection-change="handleSelectionChange" @row-click="toggleCurrentRow">
      <el-table-column prop="date" label="入职日期" sortable></el-table-column>
      <el-table-column prop="name" label="员工名称" sortable></el-table-column>
      <el-table-column prop="address" label="员工地址" sortable></el-table-column>
    </el-table>
    <!--列表 end-->
    <!--分页start -->
    <div class="clearfix center mt-3">
      <pagination v-show="filters.total>0" :total="filters.total" :page.sync="filters.page" :limit.sync="filters.pageSize" @pagination="getList" />
    </div>
    <!--分页end -->
  </el-dialog>
</template>

<script>
import Pagination from "@/components/Pagination";
import utils from "@/utils/index";
export default {
  name: "staff",
  components: {
    Pagination
  },
  data() {
    return {
      filters: {
        pageSize: 10,
        page: 1,
        total: 0,
        keyWord: ""
      },
      visible:false,
      tableData: [],
      title: "",
    };
  },
  mounted() {},
  methods: {
    selectInput() {
      this.filters.page = 1;
      this.getList();
    },
    //模拟获取数据
    getList() {
      this.tableData = [];
      this.filters.total = 100;
      let i = (this.filters.page - 1) * this.filters.pageSize + 1;
      let max = this.filters.page * this.filters.pageSize;
      for (; i <= max; i++) {
        this.tableData.push({
          personId: i,
          name: "小明同志" + i,
          date: "2019-4-30",
          address: "上海市普陀区金沙江路 1517 弄"
        });
      }
    }, 
    //当用户手动勾选数据行的 Checkbox 时触发的事件
    handleRowSelect(selection, row){


    },
    //当用户手动勾选全选 Checkbox 时触发的事件
    handleSelectAll(selection){

    },
    //当选择项发生变化时会触发该事件
    handleSelectionChange(selection){

    },
    //当某一行被点击时会触发该事件
    toggleCurrentRow(row, column, event){
      this.visible=false;
      this.$

    }



    // 获取数据列表
    // async getList() {
    //   let res = await this.ajax("queryStaff", this.filters);
    //   if (res.status === 0) {
    //     this.filters.total = res.map.lines;
    //     this.list = res.map.staffs;
    //     this.checkSelectedIds();
    //   } else {
    //     this.filters.total = 0;
    //     this.list = [];
    //   }
    //   this.listLoading = false;
    // },
  }
};
</script>
