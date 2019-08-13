/*
 * @Author: xgw 
 * @Date: 2019-05-06 17:04:38 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-08-13 16:06:50
 */
<!--计划——日历视图-->
<template>
  <el-row id="calendarView">
    <el-col :span="24">
      <div class="el-card box-card schedule">
        <div class="el-card__header fz16">
          <span>时间区间：</span>
          <el-date-picker v-model="timeQuantum" @change="changeTime" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="|" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
          <span class="pl-3">生产路径：</span>
          <el-input v-model="path.name" suffix-icon="el-icon-search" class="pointer size3" readonly @click.native="path.dialog = true"></el-input>
        </div>
        <div class="el-card__body scheduleBody">
          <el-table :data="scheduleData" height="700" border ref="table" style="width:100%" v-loading="tableLoading" v-if="!tableLoading">
            <el-table-column fixed prop="executionUnitName" label="执行单元" width="150" align="center">
            </el-table-column>
            <el-table-column fixed label="班次" width="150" align="center">
              <div slot-scope="scope" class="operation">
                <p v-for="(item,index) in scope.row.classesDTOs" :key="index" class="ulclass">
                  {{item.classes}}
                </p>
              </div>
            </el-table-column>
            <el-table-column :label="item1.time" width="150" v-for="(item1,index1) in dateList" :key="index1" header-align="center">
              <div slot-scope="scope">
                <div v-for="(item,index) in scope.row.classesDTOs||[]" :key="index" class="ulclass">
                  <div v-for="(item2,index2) in item.schedulingDateDTOs||[]" :key="index2">
                    <div class="codeList" v-if="item2.scheduleTime===item1.time">
                      <p v-for="(a,b) in item2.batchDTOs||[]" :key="b" class="fl liw" :style="{backgroundColor:findColor(a.planId)}" v-showDetails="{executionUnitName:scope.row.executionUnitName,scheduleTime:item2.scheduleTime,classes:item.classes,batchNumber:a.batchNumber,batchOutputQuantity:a.batchOutputQuantity,batchId:a.batchId,planId:a.planId}">
                        {{a.batchNumber}}
                      </p>
                    </div>
                    <div class="moreBox" v-if="item2.scheduleTime===item1.time&&item2.batchDTOs.length>4">
                      <div class="leftBox">
                        <span class="color-active" v-Moreshow="{executionUnitName:scope.row.executionUnitName,scheduleTime:item2.scheduleTime,classes:item.classes,batchDTOs:item2.batchDTOs}">+{{item2.batchDTOs.length-4}}更多</span>
                      </div>
                      <div class="rightBox">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <!-- 单个批次查看 -->
        <div class="el-card box-card showOneDetails" v-if="showOneDetails.show" :style="{top:showOneDetails.top+'px',left:showOneDetails.left+'px'}" v-closeDetails="closeOne">
          <div class="el-card__header fz16">
            <span class="pr-3">{{oneDetails.executionUnitName}}</span>
            <span class="pr-3">{{oneDetails.scheduleTime}}</span>
            <span class="pr-3">{{oneDetails.classes}}</span>
          </div>
          <div class="el-card__body">
            <p>批次号：{{oneDetails.batchNumber}}</p>
            <p class="py-3">排产量：{{oneDetails.batchOutputQuantity}}</p>
            <div>设备型号：{{equipmentModel}}</div>
          </div>
        </div>
        <!-- 更多批次批次查看 -->
        <div class="el-card box-card moreDetails" v-if="moreBatch.show" v-closeDetails="closeMore">
          <div class="el-card__header fz16">
            <span class="pr-3">{{moreBatch.data.executionUnitName}}</span>
            <span class="pr-3">{{moreBatch.data.scheduleTime}}</span>
            <span class="pr-3">{{moreBatch.data.classes}}</span>
          </div>
          <div class="el-card__body">
            <el-table :data="filterBatchDTOs(moreBatch.data.batchDTOs)" height="300">
              <el-table-column label="批次号" prop="batchNumber"></el-table-column>
              <el-table-column label="排产量" prop="batchOutputQuantity"></el-table-column>
              <el-table-column label="设备型号" align="center">
                <template slot-scope="scope">
                  <el-popover placement="right" width="200" trigger="manual" v-model="scope.row.equipmentModelDialog">
                    <div class="el-card box-card">
                      <div class="el-card__body">
                        <p v-for="(item3,index3) in equipmentModel1" :key="index3" v-cloak>
                          {{index3+1}}：{{item3.devicesModel}}
                        </p>
                      </div>
                    </div>
                    <span slot="reference" @click.stop="lookEquipmentModel(scope.row)" class="color-active">查看</span>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-col>
    <!-- 选择生产路径 -->
    <el-dialog title="选择生产路径" :visible.sync="path.dialog" width="700px" :close-on-click-modal='false'>
      <el-row type="flex" justify="end" class="mb-3">
        <el-input placeholder="搜索名称或编号" style="width:300px" class="mr-3" clearable v-model="pathFilters.keyWord" @clear="selectPathList" @change="selectPathList" @keyup.native.enter="selectPathList">
          <el-button slot="append" icon="el-icon-search" size="small" @click.native="selectPathList"></el-button>
        </el-input>
      </el-row>
      <el-table :data="pathList" @row-click="selectPath">
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="pathNumber" label="生产路径编号" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="pathName" label="生产路径名称" align="center" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="center">
        <pagination v-show="pathFilters.total>0" :total="pathFilters.total" :page.sync="pathFilters.page" :limit.sync="pathFilters.pageSize" @pagination="getPathList" />
      </div>
    </el-dialog>
  </el-row>

</template>
<script>
import pagination from "@/components/Pagination";
import {
  executionUnitDTOs,
  planDtos,
  pathDtos
} from "@/assets/json/planCalendar";
import utils from "@/utils";
export default {
  name: "schedule",
  components: {
    pagination
  },
  directives: {
    showDetails: {
      inserted: function(el, binding, vnode) {
        let _target = el;
        let Vue = vnode.context,
          val = binding.value;
        Vue.showOneDetails.show = false;
        _target.onclick = function(e) {
          e.stopPropagation();
          Vue.oneDetails = Object.assign({}, val);
          Vue.getBatchFacility(binding.value.batchId);
          Vue.showOneDetails.show = true;
          Vue.moreBatch.show = false;
          var box = document.getElementById("box"); // 获取元素
          const top = _target.getBoundingClientRect().top; // 元素上边距离页面上边的距离
          const bottom = _target.getBoundingClientRect().bottom; // 元素下边距离页面上边的距离
          const left = _target.getBoundingClientRect().left; // 元素左边距离页面左边的距离
          const right = _target.getBoundingClientRect().right; // 元素右边距离页面左边的距离
          const screenWidth = document.body.clientWidth; //可见区域宽
          const screenHeight = document.body.clientHeight; //可见区域高
          const maxDragDomLeft = screenWidth - left - 150; //150为div的width
          const maxDragDomTop = screenHeight - bottom;
          // console.log(maxDragDomLeft, maxDragDomTop);
          // div:300 200, 批次 150px
          if (maxDragDomLeft > 300) {
            Vue.showOneDetails.left = left - 55;
          } else {
            Vue.showOneDetails.left = left - 505;
          }
          if (maxDragDomTop > -750) {
            Vue.showOneDetails.top = top - 120;
          } else {
            Vue.showOneDetails.top = top - 300;
          }
        };
      }
    },
    closeDetails: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    },
    Moreshow: {
      inserted: function(el, binding, vnode) {
        let _target = el;
        let Vue = vnode.context,
          val = binding.value;

        Vue.moreBatch.show = false;
        _target.onclick = function(e) {
          e.stopPropagation();
          Vue.moreBatch.data = Object.assign({}, val);
          Vue.moreBatch.show = true;
          Vue.showOneDetails.show = false;
        };
      }
    }
  },
  watch: {
    //出现详情时 滚动条不能滚动
    "showOneDetails.show": function(a, b) {
      if (a) {
        this.$refs.table.bodyWrapper.style.overflow = "hidden";
      } else {
        this.$refs.table.bodyWrapper.style.overflow = "";
      }
    },
    //出现详情时 滚动条不能滚动
    "moreBatch.show": function(a, b) {
      if (a) {
        this.$refs.table.bodyWrapper.style.overflow = "hidden";
      } else {
        this.$refs.table.bodyWrapper.style.overflow = "";
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      //为了搞颜色
      planColorList: [],
      color: [
        "#71C262",
        "#E2D2A1",
        "#F9D450",
        "#53BAD1",
        "#ABC4C1",
        "#A3AFC7",
        "#B7998E",
        "#F4AE4A",
        "#A3AFC7",
        "#EF8B6F"
      ],
      showType: "日历",
      //top筛选条件
      planType: "all",
      planTypeList: [
        {
          value: "all",
          label: "所有计划"
        },
        {
          value: "creation",
          label: "我创建"
        },
        {
          value: "principal",
          label: "我负责"
        }
      ],
      state: "all",
      stateList: [
        {
          value: "all",
          label: "所有状态"
        },
        {
          value: "1",
          label: "未生产"
        },
        {
          value: "2",
          label: "生产中"
        },
        {
          value: "0",
          label: "完成"
        },
        {
          value: "3",
          label: "暂停"
        },
        {
          value: "4",
          label: "关闭"
        }
      ],
      keyword: "", //生产计划，产品名称关键字
      timeQuantum: [], //时间段选择
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
          }
        ]
      },
      //生产路径
      path: {
        name: "",
        id: "",
        dialog: false
      },
      pathList: [],
      pathFilters: {
        keyWord: "",
        page: 1,
        pageSize: 10,
        total: 0
      },
      //日历排程数组
      scheduleData: [],
      dateList: [],
      //单个查看
      showOneDetails: {
        show: false,
        top: 0,
        left: 0
      },
      oneDetails: {},
      equipmentModel: "", //设备型号，过滤数据时候使用
      equipmentModel1: [],
      //更多批次
      moreBatch: {
        show: false,
        data: {},
        top: 0,
        left: 0
      }
    };
  },
  mounted() {
    //查询生产路径
    this.getPathList();
    this.defaultTime();
  },
  methods: {
    //搞计划颜色区分
    getPlan() {
      let startTime = utils.formatDate.format(
          new Date(this.timeQuantum[0]),
          "yyyy-MM-dd"
        ),
        endTime = utils.formatDate.format(
          new Date(this.timeQuantum[1]),
          "yyyy-MM-dd"
        );
      if (this.timeQuantum.length == 0) {
        // this.$message({
        //   message: "选择时间范围",
        //   type: "warning"
        // });
      } else if (this.path.id == "") {
        // this.$message({
        //   message: "选择生产路径",
        //   type: "warning"
        // });
      } else {
        let e = planDtos;
        // this.ajax("getPlanBasicData", {
        //   operationType: "calendarViewPageDim",
        //   planProductionStatus: "rejectDrafts",
        //   // peopleType:"all",
        //   orderRegulation: "asc",
        //   startDate: startTime + " 00:00:00",
        //   endDate: endTime + " 00:00:00",
        //   productionPathId: this.path.id
        // }).then(e => {
        if (e.status === 0) {
          //表示成功
          this.planColorList = [];
          e.map.planDtos.forEach((n, index) => {
            this.planColorList.push({
              planId: n.planId,
              color: this.color[index % 10]
            });
          });
        } else if (e.status === 2) {
          //暂无数据
          this.planColorList = [];
        } else {
          this.$message({
            message: e.msg,
            type: "error"
          });
        }
        // });
      }
    },
    findColor(planId) {
      let data = this.planColorList.filter(n => {
        return n.planId === planId;
      });
      return data[0] ? data[0].color : "#e4e7ed";
    },
    //查看生产路径
    // async getPathList() {
    //   const e = await this.ajax("getPath", {
    //     operationType: "productionPathPageDim",
    //     defaultVersions: "0", //0默认,1非默认
    //     productionPathStatus: "1", //发布
    //     iteration: "all",
    //     bindingCraft: "all",
    //     productionPathNumber: this.pathFilters.keyWord,
    //     productionPathName: this.pathFilters.keyWord,
    //     page: this.pathFilters.page,
    //     pageSize: this.pathFilters.pageSize
    //   });
    //   if (e.status === 0) {
    //     //表示成功
    //     this.pathList = e.map.pathDtos;
    //     this.pathFilters.total = e.map.line;
    //   } else if (e.status === 2) {
    //     //暂无数据
    //     this.pathFilters.total = 0;
    //     this.pathList = [];
    //   } else {
    //     this.$message({
    //       message: e.msg,
    //       type: "error"
    //     });
    //   }
    // },
    getPathList() {
      let e = pathDtos;
      if (e.status === 0) {
        //表示成功
        this.pathList = e.map.pathDtos;
        this.pathFilters.total = e.map.line;
      } else if (e.status === 2) {
        //暂无数据
        this.pathFilters.total = 0;
        this.pathList = [];
      } else {
        this.$message({
          message: e.msg,
          type: "error"
        });
      }
    },
    //模糊
    selectPathList() {
      this.pathFilters.page = 1;
      this.getPathList();
    },
    //选择生产路径
    selectPath(row) {
      this.path.id = row.pathId; //生产路径id
      this.path.name = row.pathName; //生产路径名称
      this.path.dialog = false;
      //1.这个执行顺序是又讲究的：1查询在时间段，改生产路径下的计划
      this.getPlan();
      //2.查询日历视图
      this.getPlanCalendar();
    },
    //默认时间
    defaultTime() {
      // let a = new Date().getTime(),
      //   b = a + 7 * 24 * 60 * 60 * 1000;
      // this.timeQuantum = [
      //   utils.formatDate.format(new Date(a), "yyyy-MM-dd"),
      //   utils.formatDate.format(new Date(b), "yyyy-MM-dd")
      // ];
      this.timeQuantum =[
        utils.formatDate.format(new Date("2019-08-04"), "yyyy-MM-dd"),
        utils.formatDate.format(new Date("2019-08-13"), "yyyy-MM-dd")
      ];
      this.checkTimeList();
    },
    //日期数据刻度
    checkTimeList() {
      let start = new Date(this.timeQuantum[0]).getTime(),
        end = new Date(this.timeQuantum[1]).getTime(),
        oneDay = 24 * 60 * 60 * 1000,
        interval = utils.div(utils.sub(end, start), oneDay);
      this.dateList = [];
      for (let index = 0; index <= interval; index++) {
        this.dateList.push({
          time: utils.formatDate.format(
            new Date(start + oneDay * index),
            "yyyy-MM-dd"
          )
        });
      }
    },
    //切换时间
    changeTime() {
      this.checkTimeList();
      this.getPlanCalendar();
    },
    //查询日历排程信息
    getPlanCalendar() {
      this.tableLoading = true;
      let startTime = utils.formatDate.format(
          new Date(this.timeQuantum[0]),
          "yyyy-MM-dd"
        ),
        endTime = utils.formatDate.format(
          new Date(this.timeQuantum[1]),
          "yyyy-MM-dd"
        );
      if (this.timeQuantum.length == 0) {
        this.$message({
          message: "选择时间范围",
          type: "warning"
        });
      } else if (this.path.id == "") {
        this.$message({
          message: "选择生产路径",
          type: "warning"
        });
      } else {
        //模拟接口
        let e = executionUnitDTOs;
        // this.ajax("getPlanCalendar", {
        //   startTime: startTime + " 00:00:00",
        //   endTime: endTime + " 00:00:00",
        //   planId: "",
        //   pathId: this.path.id, //生产路径id
        //   peopleType: this.planType, //人员类型
        //   planProductionStatus: this.state, //状态
        //   planNumber: this.keyword,
        //   productName: this.keyword
        // }).then(e => {
        setTimeout(() => {
          this.tableLoading = false;
        }, 500);
        if (e.status === 0) {
          this.scheduleData = [];
          e.map.executionUnitDTOs.forEach(n => {
            let classesDTOs = [],
              obj = {};
            if (n.classesDTOs == null) {
              obj = Object.assign({}, n, { classesDTOs: [] });
            } else {
              n.classesDTOs.forEach(n1 => {
                let schedulingDateDTOs = [],
                  obj1 = {};
                if (n1.schedulingDateDTOs == null) {
                  obj1 = Object.assign({}, n1, {
                    schedulingDateDTOs: []
                  });
                } else {
                  obj1 = Object.assign({}, n1, {
                    schedulingDateDTOs: schedulingDateDTOs
                  });
                  n1.schedulingDateDTOs.forEach(n2 => {
                    let obj2 = Object.assign({}, n2, { moreVisible: false });
                    schedulingDateDTOs.push(obj2);
                  });
                }
                classesDTOs.push(obj1);
                obj = Object.assign({}, n, { classesDTOs: classesDTOs });
              });
            }
            this.scheduleData.push(obj);
          });
        } else if (e.status === 2) {
          this.scheduleData = [];
        } else {
          this.$message({
            message: e.msg,
            type: "error"
          });
        }
        // });
      }
    },
    //查询批次下绑定的设备型号
    getBatchFacility(id) {
      // async return的是个Promise [[PromiseStatus]]: "resolved"，[[PromiseValue]]: "自动叠片机"
      // this.ajax("getPlanDeviceModel", {
      //   operationType: "batch",
      //   batchId: id
      // }).then(e => {
      //   if (e.status === 0) {
      //     let str = "";
      //     e.map.deviceModelDTOs.forEach(n => {
      //       str += n.devicesModel + "，";
      //     });
      //     this.equipmentModel = str.substring(0, str.length - 1);
      //   } else {
      //     this.equipmentModel = "";
      //   }
      // });
      this.equipmentModel = "设备A，设备B，设备C";
    },
    //查询批次下绑定的设备型号
    getBatchFacility1(id) {
      // async return的是个Promise [[PromiseStatus]]: "resolved"，[[PromiseValue]]: "自动叠片机"
      // this.ajax("getPlanDeviceModel", {
      //   operationType: "batch",
      //   batchId: id
      // }).then(e => {
      //   if (e.status === 0) {
      //     this.equipmentModel1 = e.map.deviceModelDTOs;
      //   } else if (e.status === 2) {
      //     this.equipmentModel1 = [];
      //   } else {
      //   }
      // });
      this.equipmentModel1 = [
        {
          devicesModel: "搅拌机",
          id: "1"
        }
      ];
    },
    //过滤批次数组，找到批次下绑定的设备型号
    filterBatchDTOs(data) {
      let newData = [];
      data.forEach((n, index) => {
        newData.push({
          planId: n.planId, //计划id
          batchNumber: n.batchNumber, //批次号
          batchOutputQuantity: n.batchOutputQuantity, //排产量
          batchId: n.batchId, //批次id
          equipmentModelDialog: false
        });
      });
      return newData;
    },
    //查看设备型号
    lookEquipmentModel(obj) {
      obj.equipmentModelDialog = !obj.equipmentModelDialog;
      if (obj.equipmentModelDialog) {
        this.getBatchFacility1(obj.batchId);
      }
    },
    //关闭单个查看
    closeOne(e) {
      this.showOneDetails.show = false;
    },
    //关闭更多
    closeMore() {
      this.moreBatch.show = false;
    }
  }
};
</script>
<style lang="scss">
#calendarView {
  .schedule {
    .scheduleBody {
      .el-table .cell {
        padding-left: 0;
        padding-right: 0;
      }
      .el-table__row {
        td {
          padding: 0;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.schedule {
  position: relative;
  .showOneDetails {
    width: 300px;
    height: 200px;
    position: absolute;
    overflow: auto;
    z-index: 999;
    &::-webkit-scrollbar {
      width: 9px;
      height: 9px;
    }
  }
  .moreDetails {
    width: 600px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 9px;
      height: 9px;
    }
  }
  .scheduleBody {
    .ulclass {
      position: relative;
      width: 150px;
      padding: 0 5px;
      height: 108px;
      border-bottom: 1px solid #ebeef5;
      &:nth-last-child(1) {
        border-bottom: none;
      }
      .codeList {
        overflow: hidden;
        height: 88px;
      }
    }
    .liw {
      width: 140px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      margin-bottom: 2px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // background-color: #e4e7ed;
      &:hover {
        background-color: #00e4bd;
      }
    }
    .moreBox {
      width: 140px;
      height: 20px;
      line-height: 20px;
      position: absolute;
      bottom: 0;
      left: 5px;
      .leftBox {
        width: 50px;
      }
      .rightBox {
        position: absolute;
        top: 0;
        left: 55px;
        width: 90px;
        height: 20px;
      }
    }
  }
}
</style>
