/*
 * @Author: xgw 
 * @Date: 2019-05-13 11:11:50 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-14 19:18:18
 */
<!--工艺模型——工艺概览-->
<template>
  <div class="processOverview">
    <div class="leftBox">
      <div class="searchDiv">
        <el-input placeholder="输入工艺模型名称关键字" v-model="processName">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <ul>
        <li v-for="(item,index) in 4" :key="index">
          <div class="name">
            <p>#工序名称#</p>
            <p>#工序代码#</p>
          </div>
          <div class="number">7</div>
          <div class="operation">
            <el-dropdown trigger="click">
              <div class="point">...</div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="processDetailDialog=true">查看</el-dropdown-item>
                <el-dropdown-item @click.native="delPrecess">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
    <div class="rightBox">
      <div class="searchDiv">
        <el-date-picker v-model="timeQuantum" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-input placeholder="版本名称关键字" v-model="versionName" class="size1">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-input placeholder="发布人名称关键字" v-model="creator" class="size1">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="searchContent">
        <el-table :data="tableData" v-loading="tableLoading" class="tableCard">
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="name" label="工艺模型版本名称" align="center">
          </el-table-column>
          <el-table-column prop="number" label="版本号" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="man" label="发布人" align="center">
          </el-table-column>
          <el-table-column prop="time" label="发布时间" align="center">
          </el-table-column>
          <el-table-column prop="say" label="版本描述" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text">版本详情</el-button>
              <el-button type="text">迭代</el-button>
              <el-button type="text" @click.stop="delVersion(scope.row.roleId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="center">
          <pagination :total="filters.total" :page.sync="filters.page" :limit.sync="filters.pageSize" @pagination="getTableData" />
        </div>
      </div>
    </div>
    <!-- 查看工序信息弹窗 -->
    <!-- 查看工序信息弹窗 -->
    <el-dialog title="查看工艺模型详情" :visible.sync="processDetailDialog" width="500px" class="detailDialog">
      <div class="detail">
        <p>工艺模型名称：</p>
        <p>所属产品：</p>
        <p>创建人：</p>
        <p>创建时间：</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/Pagination";
export default {
  name: "processOverview",
  components: {
    pagination
  },
  data() {
    return {
      processName: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      timeQuantum: [], //时间段选择
      versionName: "",
      creator: "",
      filters: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      tableData: [
        {
          name: "#版本名称#",
          number: "#版本号#222222222222222222222222222222",
          man: "#员工姓名#",
          time: "0401-2019-15:16:17",
          say: "#迭代描述迭代描述#...666666666666666666666"
        },
        {
          name: "#版本名称#",
          number: "#版本号#",
          man: "#员工姓名#",
          time: "0401-2019-15:16:17",
          say: "#迭代描述迭代描述#..."
        },
        {
          name: "#版本名称#",
          number: "#版本号#",
          man: "#员工姓名#",
          time: "0401-2019-15:16:17",
          say: "#迭代描述迭代描述#..."
        },
        {
          name: "#版本名称#",
          number: "#版本号#",
          man: "#员工姓名#",
          time: "0401-2019-15:16:17",
          say: "#迭代描述迭代描述#..."
        },
        {
          name: "#版本名称#",
          number: "#版本号#",
          man: "#员工姓名#",
          time: "0401-2019-15:16:17",
          say: "#迭代描述迭代描述#..."
        }
      ],
      processDetailDialog: false
    };
  },
  methods: {
    //删除工序
    delPrecess() {
      this.$confirm("该工艺模型及其所有已发布的版本数据将被删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    delVersion() {
      this.$confirm("该版本的工艺模型将被删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    //获取列表数据
    getTableData() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";
.processOverview {
  width: 100%;
  height: -moz-calc(100vh - 60px);
  height: -webkit-calc(100vh - 60px);
  height: calc(100vh - 60px);
  .leftBox {
    width: 300px;
    height: 100%;
    overflow: auto;
    background-color: $elAsideColor;
    float: left;
    .searchDiv {
      width: 280px;
      height: 60px;
      padding: 10px 0px 10px 35px;
    }
    ul > li {
      width: 100%;
      height: 60px;
      font-size: 18px;
      cursor: pointer;
      border-bottom: 1px solid rgb(220, 223, 230);
      .name {
        float: left;
        width: 240px;
        padding: 0 5px;
        p {
          height: 30px;
          line-height: 30px;
        }
      }
      .number {
        float: left;
        width: 20px;
        height: 20px;
        background-color: $color-active;
        border-radius: 10px;
        margin-top: 20px;
        text-align: center;
      }
      .operation {
        float: right;
        padding-right: 5px;
        .point {
          font-size: 30px;
          font-weight: 700;
          color: $color-active;
        }
      }
      &:hover {
        background-color: $content-color;
      }
    }
  }
  .rightBox {
    height: 100%;
    overflow: auto;
    float: left;
    width: -moz-calc(100% - 300px);
    width: -webkit-calc(100% - 300px);
    width: calc(100% - 300px);
    .searchDiv {
      display: inline-block;
      line-height: 60px;
      text-align: right;
      width: 100%;
      height: 60px;
      padding-right: 20px;
      .size1 {
        width: 300px;
      }
    }
    .searchContent {
      padding: 0 20px;
    }
  }
  .detailDialog {
    .detail {
      margin: 0px 10px;
      border: 1px solid rgb(214, 206, 206);
      border-radius: 5px;
      p {
        margin: 20px 20px;
      }
    }
  }
}
</style>