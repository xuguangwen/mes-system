/*
 * @Author: xgw 
 * @Date: 2019-05-14 10:23:29 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 10:48:06
 */
<!--选择输出物-->
<template>
  <div class="basicStep2">
    <div class="el-card box-card is-always-shadow">
      <div class="el-card__header fz16">
        <el-button type="primary" size="small" @click="selectData">选择输出物</el-button>
        <!-- <el-dropdown trigger="click" class="mr-3">
          <el-button type="primary" size="small">选择输出物</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="visibleDialog=true">成品</el-dropdown-item>
            <el-dropdown-item @click.native="visibleDialog1=true">半成品</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
      <div class="el-card__body">
        <p class="color-warning mb-3">说明：一道工序可选择多个产出物。主要产出物有且仅有1个。</p>
        <el-table :data="tableDate" v-loading="tableLoading" border>
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="material_name" label="输出物名称" align="center">
          </el-table-column>
          <el-table-column prop="material_model" label="输出物编号" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="单位" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="标签" align="center">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text">标记主要产出</el-button>
              <el-button type="text" @click="delMaterial(scope.row.material_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="center">
          <pagination :total="filters.total" :page.sync="filters.page" :limit.sync="filters.pageSize" @pagination="getTableData" />
        </div>
      </div>
    </div>
    <!-- 选择原料信息 -->
    <el-dialog title="选择输出物信息" :visible.sync="visibleDialog" width="700px" :close-on-click-modal='false'>
      <el-row type="flex" justify="end" class="mb-3">
        <el-radio-group v-model="curProduct" style="margin-right:120px">
          <el-radio-button label="成品" @click.native="selectFinishProduct"></el-radio-button>
          <el-radio-button label="半成品" @click.native="selectSeminProduct"></el-radio-button>
        </el-radio-group>
        <el-input placeholder="搜索输出物信息关键字" style="width:300px" class="mr-3" clearable v-model="filters1.keyWord" @clear="selectInput" @change="selectInput" @keyup.native.enter="selectInput">
          <el-button slot="append" icon="el-icon-search" size="small" @click.native="selectInput"></el-button>
        </el-input>
        <el-button type="primary" @click="saveListData">保存</el-button>
      </el-row>
      <el-table :data="list" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column label="物料编号" prop="productNumber" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="物料名称" prop="productName" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="规格型号" prop="productModel" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="单位" prop="productUnitName" align="center" show-overflow-tooltip></el-table-column>
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
  name: "basicStep1",
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
      curProduct: "成品", //成品
      filters1: {
        keyWord: "",
        page: 1,
        pageSize: 10,
        total: 1
      },
      list: [],
      multipleSelection: []
    };
  },
  methods: {
    //查询表格数据
    getTableData() {},
    //选择某某
    selectData() {
      this.visibleDialog = true;
      this.getListData();
    },
    delMaterial() {},
    //获取弹出框table数据
    //搜索成品或半成品信息
    getProductData() {
      this.filters.page = 1;
      this.selectProduct();
    },
    // 查询半成品
    selectSeminProduct() {
      this.curProduct = "半成品";
      this.selectProduct();
    },
    //查询成品
    selectFinishProduct() {
      (this.curProduct = "成品"), this.selectProduct();
    },
    //点击+号查询成品信息
    getListData() {
      this.filters1.keyWord = "";
      this.ajax("queryProduct", {
        type: this.curProduct == "成品" ? "finishProduct" : "semiFinished",
        keyWord: this.filters1.keyWord,
        page: this.filters1.page,
        pageSize: this.filters1.pageSize
      }).then(res => {
        if (res.status == 0) {
          this.list = res.map.productDTOs;
          this.filters1.total = res.map.line;
        } else if (res.status == 2) {
          this.$message({
            message: res.msg,
            type: "error"
          });
          this.filters1.total = 0;
          this.list = [];
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
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
