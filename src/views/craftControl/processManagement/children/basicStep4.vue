/*
 * @Author: xgw 
 * @Date: 2019-05-14 10:23:29 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 10:48:19
 */
<!--选择文档-->
<template>
  <div class="basicStep4">
    <div class="el-card box-card is-always-shadow">
      <div class="el-card__header fz16">
        <el-button type="primary" size="small" @click="selectData" class="mr-3">选择文档</el-button>
      </div>
      <div class="el-card__body">
        <el-table :data="tableDate" v-loading="tableLoading" border>
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="material_name" label="文档名称" align="center">
          </el-table-column>
          <el-table-column prop="material_model" label="文档编号" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="文档类型" align="center">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delMaterial(scope.row.material_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="center">
          <pagination :total="filters.total" :page.sync="filters.page" :limit.sync="filters.pageSize" @pagination="getTableData" />
        </div>
      </div>
    </div>
    <!-- 选择文档信息 -->
    <el-dialog title="选择文档" :visible.sync="visibleDialog" width="600px" :close-on-click-modal='false'>
      <el-row type="flex" justify="end" class="mb-3">
        <el-select v-model="documentTypeVal" placeholder="请选择" @change="changeType">
          <el-option v-for="item in documentType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="搜索文档名称关键字" style="width:300px" class="mx-3" clearable v-model="filters1.keyWord" @clear="selectInput" @change="selectInput" @keyup.native.enter="selectInput">
          <el-button slot="append" icon="el-icon-search" size="small" @click.native="selectInput"></el-button>
        </el-input>
        <el-button type="primary" @click="saveListData">保存</el-button>
      </el-row>
      <el-table :data="list" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="documentName" label="文档名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="documentNumber" label="文档编号" show-overflow-tooltip></el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
      </el-table>
      <div class="center">
        <pagination :total="filters1.total" :page.sync="filters1.page" :limit.sync="filters1.pageSize" @pagination="getListData" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/Pagination";
export default {
  name: "basicStep4",
  components: {
    pagination
  },
  data() {
    return {
      tableLoading: false,
      tableDate: [
        {
          material_id: "material_id",
          material_name: "material_name",
          material_model: "material_model",
          material_unit: "material_unit"
        }
      ],
      filters: {
        page: 1,
        pageSize: 10,
        total: 1
      },
      //弹出框之后的数据
      visibleDialog: false,
      filters1: {
        keyWord: "",
        page: 1,
        pageSize: 10,
        total: 1
      },
      list: [],
      multipleSelection: [],
      documentTypeVal: "",
      documentType: [] //文档类型
    };
  },
  mounted() {
    this.getdocumentType();
  },
  methods: {
    //查询表格数据
    getTableData() {},
    //选择某某
    selectData() {
      this.visibleDialog = true;
      this.getListData();
    },
    //查询文档类型
    getdocumentType() {
      this.documentType = [];
      this.ajax("queryDocumentTypeAbstract", {
        documentManagementType: "production"
      }).then(res => {
        if (res.status == 0) {
          res.map.DocumentTypeDTOs.forEach(n => {
            this.documentType.push({
              value: n.documentTypeId,
              label: n.documentTypeName
            });
          });
          this.documentTypeVal = this.documentType[0].value;
        } else if (res.status == 2) {
          this.documentType = [];
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    delMaterial() {},

    //获取弹出框table数据
    async getListData() {
      var res = await this.ajax("queryDocumentAbstract", {
        keyword: this.filters1.keyWord,
        page: this.filters1.page,
        pageSize: this.filters1.pageSize,
        documentTypeId: this.documentTypeVal
      });
      if (res.status == 0) {
        this.list = res.map.DocumentDTOs;
        this.filters1.total = res.map.line;
      } else if (res.status == 2) {
        this.list = [];
        this.filters1.total = 0;
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
    },
    changeType(){
      this.getListData();
    },
    selectInput() {
      this.filters1.page = 1;
      this.getListData();
    },
    //选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //保存step数据
    saveListData() {}
  }
};
</script>