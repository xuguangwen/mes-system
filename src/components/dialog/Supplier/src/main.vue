/*
 * @Author: xgw 
 * @Date: 2019-04-20 11:58:23 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-04-20 14:26:53
 */
<template>
  <el-dialog :title="title || '' " :visible.sync="visible" class="mes-dialog" width="50%">
    <el-col class="toolbar">
      <el-form :inline="true" :model="params" @submit.native.prevent class="text-right">
        <el-form-item>
          <el-input v-model="params.keyword" placeholder="输入关键字" clearable @clear="selectInput" @change="selectInput" @keyup.native.enter="selectInput">
            <el-button slot="append" icon="el-icon-search" @click.native="selectInput"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表 start-->
    <el-table :data="list" v-loading="listLoading" row-class-name="el-mini-row pointer" ref="multipleTable" @select="handleRowSelect" @select-all="handleSelectAll" @selection-change="handleSelectionChange" @row-click="toggleCurrentRow" :highlight-current-row="!multiple">
      <el-table-column type="selection" width="55" v-if="multiple"></el-table-column>
      <el-table-column type="index" label="序号" v-else></el-table-column>
      <el-table-column prop="supplier_code" label="供应商编号"></el-table-column>
      <el-table-column prop="supplier_name" label="供应商名称"></el-table-column>
      <el-table-column prop="supplier_contact" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>
    <!--列表 end-->
    <div class="clearfix center mt-3">
      <el-col class="center">
        <pagination v-show="filters.total>0" :total="filters.total" :page.sync="filters.page" :limit.sync="filters.pageSize" @pagination="getDataList" />
      </el-col>
      <!--确认选择 start-->
      <el-col :span="24" class="text-right mt-4" v-if="multiple">
        <el-button type="success" size="" @click="confirmSelected" :disabled="!selectedRows || selectedRows.length === 0">确认选择</el-button>
      </el-col>
      <!--确认选择 end-->
    </div>
  </el-dialog>
</template>

<script>
import utils from "@/utils/index";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  name: "Supplier",
  data() {
    return {
      params: {
        keyword: ""
      },
      filters: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      action: "", // 动作
      visible: false,
      selectedRows: null,
      list: [],
      listLoading: false,
      callback: null,
      title: "",
      multiple: false,
      selectedIds: []
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    handleSelectionChange(rows) {
      this.selectedRows = rows;
      if (this.multiple) {
        this.checkedSelectRows(rows, rows, "add");
      }
    },
    // 单行选中
    handleRowSelect(rows, row) {
      let checked = false;
      rows
        .map(v => v.supplier_id)
        .forEach(id => {
          if (id === row.supplier_id) {
            checked = true;
          }
        });
      // 选中 - 新增一行
      if (checked) {
        this.checkedSelectRows(rows, [row], "add");
      } else {
        this.checkedSelectRows(rows, [row], "del");
      }
    },
    // 选中全部
    handleSelectAll(rows) {
      // 取消全选
      if (rows.length === 0) {
        this.checkedSelectRows(this.list, this.list, "del");
      } else {
        this.checkedSelectRows(rows, rows, "add");
      }
    },
    // 检查行 - 新增还是删除行
    checkedSelectRows(checkedRows, rows, type = "add") {
      // 新增
      if (type === "add") {
        this.selectedIds = [
          ...new Set([...this.selectedIds, ...rows.map(v => v.supplier_id)])
        ];
      } else if (type === "del") {
        // 删除
        rows.forEach(row => {
          let index = this.selectedIds.indexOf(row.supplier_id);
          if (index > -1) {
            this.selectedIds.splice(index, 1);
          }
        });
      }
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    // 确认选择
    confirmSelected(row) {
      this.visible = false;
      if (this.multiple) {
        // 选择多行
        this.selectedIds.forEach((id, idx) => {
          this.selectedRows[idx] = { supplier_id: id };
        });
      } else {
        // 选择单行
        this.selectedRows = [row];
      }
      this.handleAction("selected");
    },
    handleAction(action) {
      this.action = action;
      // 手动触发instance的回调，用以resolve
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
        this.$refs.multipleTable.clearSelection();
      }, 0);
    },
    // 多选情况
    toggleCurrentRow(row) {
      if (this.multiple) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.$nextTick(() => {
          this.handleRowSelect(this.selectedRows || [], row);
        });
      } else {
        this.confirmSelected(row);
      }
    },
    // 列表索引
    getIndex(index) {
      return utils.getHeadNumAdapter(
        this.filters.page,
        this.filters.pageSize,
        index
      );
    },
    selectInput() {
      this.filters.page = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      // this.list = []
      this.listLoading = true;
      let para = Object.assign(
        {
          headNum: utils.getHeadNumAdapter(
            this.filters.page,
            this.filters.pageSize
          )
        },
        this.filters,
        this.params
      );
      this.ajax("querySupplier", para).then(data => {
        if (data.status === 0) {
          this.filters.total = data.map.line;
          this.list = data.map.supplierInfoDTOs;
          this.checkSelectedIds();
        } else {
          this.filters.total = 0;
          this.list = [];
        }
        this.listLoading = false;
      });
    },
    // 初始选择的行
    checkSelectedIds() {
      if (!this.multiple) {
        this.$nextTick(() => {
          this.$refs.multipleTable.setCurrentRow();
        });
      }
      // 多行选择的情况
      if (this.selectedIds.length > 0 && this.multiple) {
        this.selectedIds.forEach(id => {
          this.list.forEach((item, index) => {
            if (item.supplier_id === id) {
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(
                  this.list[index],
                  true
                );
              });
            } else {
              this.$refs.multipleTable.toggleRowSelection(
                this.list[index],
                false
              );
            }
          });
        });
      } else if (this.selectedIds.length > 0 && !this.multiple) {
        // 单行选择的情况
        this.list.forEach((item, index) => {
          if (item.supplier_id === this.selectedIds[0]) {
            this.$nextTick(() => {
              this.$refs.multipleTable.setCurrentRow(this.list[index]);
            });
          }
        });
      } else if (this.selectedIds.length === 0) {
        try {
          this.$refs.multipleTable.clearSelection();
        } catch (e) {}
      }
    }
  }
};
</script>