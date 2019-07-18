/*
 * @Author: xgw 
 * @Date: 2019-05-13 19:36:21 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-14 19:05:12
 */
<!--工序参数信息-->
<template>
  <div class="parameterStep">
    <div class="el-card box-card is-always-shadow">
      <div class="el-card__header fz16">
        <el-button type="primary" size="small" class="mr-3" @click="selectData">选择设备参数</el-button>
        <el-button type="primary" size="small">添加自定义参数</el-button>
      </div>
      <div class="el-card__body">
        <el-table :data="tableDate" v-loading="tableLoading" border>
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="material_name" label="参数名称" align="center">
          </el-table-column>
          <el-table-column prop="material_model" label="参数单位" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="参数标签" align="center">
          </el-table-column>
          <el-table-column prop="material_unit" label="参数描述" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.material_unit" placeholder="限15以内"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delMaterial(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="选择设备参数" :visible.sync="visibleDialog" width="600px" :close-on-click-modal='false'>
      <el-row type="flex" justify="end" class="mb-3">
        <el-select v-model="typeVal" placeholder="请选择" @change="changeType">
          <el-option v-for="item in equipmentType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="搜索设备名称关键字" style="width:300px" class="mx-3" clearable v-model="filters1.keyWord" @clear="selectInput" @change="selectInput" @keyup.native.enter="selectInput">
          <el-button slot="append" icon="el-icon-search" size="small" @click.native="selectInput"></el-button>
        </el-input>
        <el-button type="primary" @click="saveListData">保存</el-button>
      </el-row>
      <el-table :data="list" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="device_name" label="参数名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="documentNumber" label="参数单位" show-overflow-tooltip></el-table-column>

        <el-table-column prop="device_model_name" label="参数类型" show-overflow-tooltip></el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
      </el-table>
      <div class="center">
        <pagination :total="filters1.total" :page.sync="filters1.page" :limit.sync="filters1.pageSize" @pagination="getListData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDate: [
        {
          material_id: "material_id",
          material_name: "material_name",
          material_model: "material_model",
          material_unit: "material_unit"
        }
      ],
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
      typeVal: "",
      equipmentType: [] //文档类型
    };
  },
  mounted() {
    this.getType();
  },
  methods: {
    delMaterial() {},
    getTableData() {},

    //选择某某
    selectData() {
      this.visibleDialog = true;
      // this.getListData();
    },
    //查询文档类型
    getType() {
      this.equipmentType = [];
      this.ajax("selectDeviceTypeAll", {}).then(res => {
        if (res.status == 0) {
          res.map.deviceTypes.forEach(n => {
            this.equipmentType.push({
              value: n.device_type_id,
              label: n.device_type_name
            });
          });
          this.typeVal = this.equipmentType[0].value;
        } else if (res.status == 2) {
          this.equipmentType = [];
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    //获取弹出框table数据
    async getListData() {
      var res = await this.ajax("selectDeviceInfoAll", {
        keyword: this.filters1.keyWord,
        page: this.filters1.page,
        pageSize: this.filters1.pageSize,
        documentTypeId: this.typeVal
      });
      if (res.status == 0) {
        this.list = res.map.deviceInfos;
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
    changeType() {
      this.getListData();
    },
    selectInput() {
      this.filters1.page = 1;
      this.getListData();
    }
  }
};
</script>
