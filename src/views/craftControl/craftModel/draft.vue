/*
 * @Author: xgw 
 * @Date: 2019-05-13 11:11:21 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-15 10:17:02
 */
<!--工艺模型——工艺草稿箱-->
<template>
  <div class="processDraft">
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
                <el-dropdown-item @click.native="detailDialog=true">查看</el-dropdown-item>
                <el-dropdown-item @click.native="delPrecess">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>

      </ul>
      <div class="addProcess">
        <el-button type="primary" size="small" icon="el-icon-plus" circle class="my-3" @click="modelFormDialog=true"></el-button>
      </div>
    </div>
    <div class="rightBox">
      <div class="searchDiv">
        <el-button type="primary" class="versionAdd" @click="$router.push({path:'/craftControl/craftModel/draft/drawPath'})">新增工艺模型版本</el-button>
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
        <div class="versionBox el-card box-card is-always-shadow" v-for="(item,index) in tableData" :key="index">
          <div class="el-card__header fz16">#工艺模型名称#</div>
          <div class="el-card__body">
            <div class="nameBox">
              <p>创建人：工序产出物</p>
              <p>创建时间：工序产出物</p>
            </div>
            <div class="basic">
              <span class="step">1</span>
              <span class="name">工艺路径绘制：</span>
              <el-button type="primary" round plain size="mini" @click="$router.push({path:'/craftControl/craftModel/draft/drawPath'})">编 辑</el-button>
            </div>
            <div class="parameter">
              <span class="step">2</span>
              <span class="name">工序参数配置：</span>
              <el-button type="primary" round plain size="mini" @click="$router.push({path:'/craftControl/craftModel/draft/parameter'})">编 辑</el-button>
            </div>
            <div class="BOM">
              <span class="step">3</span>
              <span class="name">产品BOM生成：</span>
              <el-button type="primary" round plain size="mini" @click="$router.push({path:'/craftControl/craftModel/draft/BOM'})">编 辑</el-button>
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
    <el-dialog title="查看工艺模型详情" :visible.sync="detailDialog" width="500px" class="detailDialog">
      <div class="detail">
        <p>工序名称：</p>
        <p>工序代码：</p>
        <p>创建人：</p>
        <p>创建日期：</p>
      </div>
    </el-dialog>
    <!-- 工艺模型信息 -->
    <el-dialog title="工艺模型信息" :visible.sync="modelFormDialog" width="500px">
      <el-form :model="modelForm" :rules="rules" ref="modelForm" label-width="120px">
        <el-form-item label="工艺模型名称" prop="modelName">
          <el-input v-model="modelForm.modelName"></el-input>
        </el-form-item>
        <el-form-item label="所属产品" prop="produtionType">
          <el-radio-group v-model="modelForm.produtionType">
            <el-radio label="成品"></el-radio>
            <el-radio label="半成品"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品名称" prop="produtionName">
          <el-input type="textarea" v-model="modelForm.produtionName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitVersionForm()">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 发布工艺模型版本 -->
    <el-dialog title="发布工艺模型版本" :visible.sync="versionDialog" width="500px">
      <el-form :model="versionForm" :rules="rules" ref="versionForm" label-width="100px">
        <el-form-item label="版本号" prop="name">
          <el-input v-model="versionForm.name"></el-input>
        </el-form-item>
        <el-form-item label="版本描述" prop="desc">
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
      modelFormDialog: false, //工艺模型信息
      modelForm: {
        modelName: "",
        produtionType: "成品",
        produtionName: ""
      },
      versionDialog: false, //发布工序版本
      versionForm: {
        name: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 15, message: "限15字以内", trigger: "blur" }
        ],
        desc: [{ min: 1, max: 50, message: "限50字以内", trigger: "blur" }],

        modelName: [
          { required: true, message: "请输入工艺模型名称", trigger: "blur" },
          { min: 1, max: 15, message: "限15字以内", trigger: "blur" }
        ],
        produtionType: [
          { required: true, message: "请选择所属产品类型", trigger: "change" }
        ]
      },
      operationDialog: false //操作记录
    };
  },
  methods: {
    //删除工序
    delPrecess() {
      this.$confirm("工艺模型及工艺模型版本的所有数据将被删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    //删除版本
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
          .basic,
          .parameter,
          .BOM {
            height: 40px;
            .step {
              text-align: center;
              display: inline-block;
              width: 35px;
              height: 20px;

              border-radius: 3px;
            }
            .name {
              display: inline-block;
              width: 280px;
            }
          }
          .parameter {
            height: 40px;
            .step {
              text-align: center;
              display: inline-block;
              width: 35px;
              height: 20px;

              border-radius: 3px;
            }
            .name {
              display: inline-block;
              width: 280px;
            }
          }
          .basic {
            .step {
              background-color: rgb(176, 249, 133);
            }
          }
          .parameter {
            .step {
              background-color: rgb(255, 248, 159);
            }
          }
          .BOM {
            border-bottom: 1px solid #ebeef5;
            .step {
              background-color: #71d3f4;
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
}
</style>