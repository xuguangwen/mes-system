/*
 * @Author: xgw 
 * @Date: 2019-05-13 11:08:27 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-16 11:46:22
 */
<!--工序管理——工艺草稿箱-->
<template>
  <div class="processDraft">
    <div class="leftBox">
      <div class="searchDiv">
        <el-input placeholder="输入工序版本名称关键字" v-model="processName" @clear="getProcess" @change="getProcess" @keyup.native.enter="getProcess" clearable>
          <el-button slot="append" icon="el-icon-search" @click.native="getProcess"></el-button>
        </el-input>
      </div>
      <ul>
        <li v-for="(item,index) in processList" :key="index">
          <div class="name">
            <p v-text="item.processName"></p>
            <p v-text="item.processCode"></p>
          </div>
          <div class="number">7</div>
          <div class="operation">
            <el-dropdown trigger="click">
              <div class="point">...</div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="detailDialog=true">查看</el-dropdown-item>
                <el-dropdown-item @click.native="delPrecess">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>

      </ul>
      <div class="addProcess">
        <el-button type="primary" size="small" icon="el-icon-plus" circle class="my-3" @click="processSelectDialog=true"></el-button>
      </div>
    </div>
    <div class="rightBox">
      <div class="searchDiv">
        <el-button type="primary" class="versionAdd" @click="$router.push({path:'/craftControl/processManagement/draft/basic'})">新增工序版本</el-button>
        <el-date-picker v-model="timeQuantum" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-input placeholder="工序名称关键字" v-model="versionName" class="size1">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-input placeholder="发布人名称关键字" v-model="creator" class="size1">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="searchContent">
        <div class="versionBox el-card box-card is-always-shadow" v-for="(item,index) in tableData" :key="index">
          <div class="el-card__header fz16">#工序版本名称#</div>
          <div class="el-card__body">
            <div class="nameBox">
              <p>工序产出物：工序产出物</p>
              <p>创建人：工序产出物</p>
              <p>创建时间：工序产出物</p>
            </div>
            <div class="basic">
              <span class="step">1</span>
              <span class="name">工序基础信息：</span>
              <el-button type="primary" round plain size="mini">编 辑</el-button>
            </div>
            <div class="parameter">
              <span class="step">2</span>
              <span class="name">工序参数信息：</span>
              <el-button type="primary" round plain size="mini" disabled>编 辑</el-button>
            </div>
            <div class="btnBox">
              <el-button type="primary" round plain size="small" @click="delVersion()">删 除</el-button>
              <el-button type="primary" round plain size="small" @click="versionDialog=true">发 布</el-button>
              <el-button type="primary" round plain size="small" @click="operationDialog=true">操作记录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看工序信息弹窗 -->
    <el-dialog title="查看工序详情" :visible.sync="detailDialog" width="500px" class="detailDialog">
      <div class="detail">
        <p>工序名称：</p>
        <p>工序代码：</p>
        <p>创建人：</p>
        <p>创建日期：</p>
      </div>
    </el-dialog>
    <!-- 选择工序 -->
    <el-dialog title="选择工序" :visible.sync="processSelectDialog" width="500px" class="processSelect">
      <div class="selectBox">
        <el-input placeholder="标准工序名称工序代码关键字" class="inputW">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table :data="tableData" border>
          <el-table-column type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column prop="name" label="工序名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="name" label="工序代码" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 发布工序版本 -->
    <el-dialog title="发布工序版本" :visible.sync="versionDialog" width="500px" class="versionDialog">
      <el-form :model="versionForm" :rules="rules" ref="versionForm" label-width="100px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="versionForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="versionForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitVersionForm()">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 操作记录 -->
    <el-dialog title="操作记录" :visible.sync="operationDialog" width="500px">
      <div style="height: 500px; overflow: auto; ">
        <el-steps direction="vertical">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 4" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/Pagination";
export default {
  name: "processDraft",
  components: {
    pagination
  },
  data() {
    return {
      processName: "",
      processList: [], //工序信息列表
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
      detailDialog: false, //详情
      processSelectDialog: false, //工序选择
      versionDialog: false, //发布工序版本
      versionForm: {
        name: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "限20字以内", trigger: "blur" }
        ],
        desc: [{ min: 1, max: 20, message: "限20字以内", trigger: "blur" }]
      },
      operationDialog: false //操作记录
    };
  },
  mounted() {
    this.getProcess();
    this.getProcessVersion();
  },
  methods: {
    //查询工序信息
    async getProcess() {
      const e = await this.ajax("getProcess", {
        published: 1,
        name: this.processName
      });
      if (e.status === 0) {
        //表示成功
        this.processList = e.map.processDTOs;
      } else if (e.status === 2) {
        //暂无数据
        this.processList = [];
      } else {
        this.$message({
          message: e.msg,
          type: "error"
        });
      }
    },
    //查询工序版本
    async getProcessVersion() {
      const e = await this.ajax("getProcessVersion", {
        id: "64ba68de1a7d4a83a40db89cf2f496cc",
        published: 1
      });
      if (e.status === 0) {
        //表示成功
      } else if (e.status === 2) {
        //暂无数据
      } else {
        this.$message({
          message: e.msg,
          type: "error"
        });
      }
    },
    //删除工序
    delPrecess() {
      this.$confirm("该工序及其所有已发布的版本数据将被删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    //删除版本
    delVersion() {
      this.$confirm("该版本的工序将被删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    //获取列表数据
    getTableData() {},
    //发布
    submitVersionForm() {
      this.$refs.versionForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";
.processDraft {
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
    height: 100%;
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
        padding-left:20px; 
        padding-right: 5px;
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
    .addProcess {
      text-align: center;
      width: 300px;
      position: fixed;
      bottom: 0;
    }
  }
  .rightBox {
    float: left;
    height: 100%;
    overflow: auto;
    width: -moz-calc(100% - 300px);
    width: -webkit-calc(100% - 300px);
    width: calc(100% - 300px);
    .searchDiv {
      position: relative;
      display: inline-block;
      line-height: 60px;
      text-align: right;
      width: 100%;
      height: 60px;
      padding: 0 20px;
      .versionAdd {
        position: absolute;
        top: 10px;
        left: 20px;
      }
      .size1 {
        width: 300px;
      }
    }
    .searchContent {
      padding: 0 20px;
      .versionBox {
        float: left;
        margin: 0 20px 20px 0;
        width: 430px;
        .el-card__body {
          .nameBox {
            border-bottom: 1px solid #ebeef5;
            margin-bottom: 20px;
            p {
              height: 40px;
              line-height: 40px;
            }
          }
          .basic {
            height: 40px;
            .step {
              text-align: center;
              display: inline-block;
              width: 35px;
              height: 20px;
              background-color: rgb(176, 249, 133);
              border-radius: 3px;
            }
            .name {
              display: inline-block;
              width: 280px;
            }
          }
          .parameter {
            height: 40px;
            border-bottom: 1px solid #ebeef5;
            .step {
              text-align: center;
              display: inline-block;
              width: 35px;
              height: 20px;
              background-color: rgb(255, 248, 159);
              border-radius: 3px;
            }
            .name {
              display: inline-block;
              width: 280px;
            }
          }
          .btnBox {
            text-align: center;
            margin-top: 20px;
          }
        }
      }
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
  .processSelect {
    .selectBox {
      text-align: right;
      .inputW {
        margin-bottom: 20px;
        width: 300px;
      }
    }
  }
}
</style>