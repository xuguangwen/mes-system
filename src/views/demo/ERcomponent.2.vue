/*
 * @Author: xgw 
 * @Date: 2019-05-06 10:02:43 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-07 16:19:10
 */
<!--实验工业流程图的抽离-->
<template>
  <div class="flowDome">
    <flow-chart :nodeDataArray=nodeDataArray :linkDataArray=linkDataArray :pattern=pattern :name="'1'"></flow-chart>
    <!-- <div id="demo1" style="width:400px; height:150px; background-color: #DAE4E4;"></div>
    <div class="my-3"></div>
    <div id="demo2" style="width:400px; height:300px; background-color: #DAE4E4;"></div>
    <div class="my-3"></div> -->
    <div id="chart-wrap" style="width: 100%; display: flex; justify-content: space-between">
      <div id="chart-diagram" style="flex-grow: 1;min-height: 400px; border: solid 1px black"></div>
    </div>
    <el-button type="primary" @click="draw">画图了哦</el-button>
    <el-button type="primary" @click="load">数据更新重新绘制</el-button>
  </div>
</template>
<script>
import { gojsUrl } from "@/api/cdn.js";
import flowChart from "@/components/flowChart";
import utils from "@/utils/index";
export default {
  name: "flowDome",
  components: {
    flowChart
  },
  mounted() {
    this.loadjs(gojsUrl).then(() => {
      this.gojsloaded = true;
    });
  },
  data() {
    return {
      gojsloaded: false,
      pattern: true,
      nodeDataArray: [
        {
          category: "Start",
          text: "开始",
          key: 0,
          loc: "-980 -120"
        },
        {
          category: "Next",
          text: "A执行单元",
          key: 1,
          loc: "-850 -120"
        },
        {
          category: "Next",
          text: "B执行单元",
          key: 2,
          loc: "-550 -220"
        },
        {
          category: "Next",
          text: "D执行单元",
          key: 4,
          loc: "-340 -220"
        },
        {
          category: "Next",
          text: "F执行单元",
          key: 5,
          loc: "-350 0"
        },
        {
          category: "End",
          text: "结束",
          key: 6,
          loc: "80 -120"
        },
        {
          category: "Next",
          text: "C执行单元",
          key: -4,
          loc: "-550 0"
        },
        {
          category: "warningNext",
          text: "紧急工序",
          key: -5,
          loc: "-140 -120"
        },
        {
          category: "Comment",
          text: "加急工序",
          key: -3,
          loc: "-80 -170"
        }
      ],
      linkDataArray: [
        {
          from: 0,
          to: 1
        },
        {
          from: 1,
          to: 2,
          fromPort: "R",
          toPort: "L"
        },
        {
          from: 2,
          to: 4,
          fromPort: "R",
          toPort: "L"
        },
        {
          from: 1,
          to: -4,
          fromPort: "R",
          toPort: "L"
        },
        {
          from: -4,
          to: 5,
          fromPort: "R",
          toPort: "L"
        },
        {
          from: 4,
          to: -5,
          fromPort: "R",
          toPort: "L"
        },
        {
          from: 5,
          to: -5,
          fromPort: "R",
          toPort: "L"
        },
        {
          from: -5,
          to: 6,
          fromPort: "R",
          toPort: "L"
        }
      ],
      chartData: {
        class: "go.GraphLinksModel",
        linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
        nodeDataArray: [
          {
            category: "Start",
            text: "开始",
            key: 0,
            loc: "0 0"
          },
          {
            category: "Next",
            text: "A执行单元",
            key: 1,
            loc: "150 0",
            state: "0"
          },
          {
            category: "Next",
            text: "B执行单元",
            key: 2,
            loc: "300 0",
            state: "1"
          },
          {
            category: "End",
            text: "结束",
            key: 3,
            loc: "450 0"
          }
        ],
        linkDataArray: [
          {
            from: 0,
            to: 1
          },
          {
            from: 1,
            to: 2,
            fromPort: "R",
            toPort: "L"
          },
          {
            from: 2,
            to: 3,
            fromPort: "R",
            toPort: "L"
          }
        ]
      }
    };
  },
  methods: {
    draw() {
      if (this.gojsloaded) {
        this.init3();
        this.load();
      } else {
        console.log("加载gojs失败");
      }
    },
    init1() {
      let diagram = new go.Diagram("demo1");
      diagram.model = new go.GraphLinksModel(
        [{ key: "Hello" }, { key: "World!" }],
        [{ from: "Hello", to: "World!" }]
      );
    },
    init2() {
      let diagram = new go.Diagram("demo2");
      let G = go.GraphObject.make; // for conciseness in defining templates
      //绘制文本
      diagram.add(
        G(
          go.Part,
          "Horizontal",
          G(go.TextBlock, {
            text: "文本块",
            margin: 5,
            editable: true, //选中后，单击编辑
            wrap: go.TextBlock.WrapFit //文本块清理边距
          }),
          G(go.TextBlock, {
            text: "文本块颜色",
            stroke: "#492"
          }),
          G(go.TextBlock, {
            text: "文本块背景",
            background: "#492",
            margin: 5,
            width: 60,
            height: 10
          }),
          G(go.TextBlock, {
            text: "文本块字体",
            font: "bold 22px serif"
          })
        )
      );
      //绘制图形
      diagram.add(
        G(
          go.Part,
          "Horizontal",
          G(go.Shape, "Rectangle", {
            width: 40,
            height: 60,
            margin: 4,
            fill: null
          }),
          G(go.Shape, "Ellipse", {
            desiredSize: new go.Size(40, 60),
            margin: 4,
            fill: null
          })
        )
      );
      //填充
      diagram.add(
        G(
          go.Part,
          "Horizontal",
          G(go.Shape, {
            width: 100,
            height: 40,
            margin: 2,
            fill: "#394",
            strokeWidth: 0
          }),
          G(go.Shape, {
            width: 100,
            height: 40,
            fill: null,
            stroke: "#394",
            strokeWidth: 4
          }),
          G(go.Shape, {
            width: 100,
            height: 40,
            fill: null,
            stroke: "#439",
            strokeWidth: 5,
            background: "#394"
          })
        )
      );
      //角度和缩放
      diagram.add(
        G(
          go.Part,
          "Table",
          G(go.Shape, {
            row: 0,
            column: 1,
            width: 40,
            height: 40,
            margin: 5,
            fill: "#492",
            strokeWidth: 0
          }),
          G(go.Shape, {
            row: 0,
            column: 2,
            width: 40,
            height: 40,
            margin: 5,
            fill: "#492",
            strokeWidth: 0,
            angle: 45
          }),
          G(go.Shape, {
            row: 0,
            column: 3,
            width: 40,
            height: 40,
            margin: 5,
            fill: "#492",
            strokeWidth: 0,
            scale: 1.5
          })
        )
      );
      //自定义
      var style = {
        width: 55,
        height: 30,
        margin: 5,
        fill: "#555"
      };
      diagram.add(
        G(
          go.Node,
          "Auto",
          G(go.Shape, "RoundedRectangle", style),
          G(go.TextBlock, {
            text: "xy1"
          })
        )
      );
      diagram.add(
        G(
          go.Node,
          "Auto",
          G(go.Shape, "Rectangle", style), //矩行
          G(go.TextBlock, {
            text: "xy2"
          })
        )
      );
    },
    // 节点模板定义
    nodeStyle() {
      return [
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          //位置位于每个节点的中心
          locationSpot: go.Spot.Center,
          isShadowed: false,
          shadowColor: "#888"
        }
      ];
    },
    init3() {
      let _self = this;
      if (window.goSamples) goSamples();
      let myDiagram = new go.Diagram("chart-diagram");
      window.myDiagram = myDiagram;
      let $ = go.GraphObject.make;
      var lightText = "whitesmoke";
      myDiagram.isReadOnly = true; //允许用户滚动和缩放，并选择部分，但不插入、删除或拖动或修改部件
      //定义侧边图像模块
      myDiagram.nodeTemplateMap.add(
        "Next",
        $(
          go.Node,
          "Spot",
          this.nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(
              go.Shape,
              "RoundedRectangle",
              {
                fill: "rgb(0, 197, 97)",
                stroke: null, 
                cursor: "pointer"
              },
              new go.Binding("figure", "figure")
            ),
            $(
              go.TextBlock,
              {
                font: "11pt Helvetica, Arial, sans-serif",
                stroke: lightText,
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
              },
              new go.Binding("text").makeTwoWay()
            )
          )
        )
      );
      myDiagram.nodeTemplateMap.add(
        "Next1",
        $(
          go.Node,
          "Spot",
          this.nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(
              go.Shape,
              "RoundedRectangle",
              {
                fill: "rgb(16, 91, 89)",
                stroke: null,
                cursor: "pointer"
              },
              new go.Binding("figure", "figure")
            ),
            $(
              go.TextBlock,
              {
                font: "11pt Helvetica, Arial, sans-serif",
                stroke: lightText,
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
              },
              new go.Binding("text").makeTwoWay()
            )
          )
        )
      );
      //开始
      myDiagram.nodeTemplateMap.add(
        "Start",
        $(
          go.Node,
          "Spot",
          this.nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(go.Shape, "Circle", {
              minSize: new go.Size(40, 40),
              fill: "rgb(29, 180, 149)", //颜色
              stroke: null
            }),
            $(
              go.TextBlock,
              "Start",
              {
                font: "11pt Helvetica, Arial, sans-serif",
                stroke: lightText
              },
              new go.Binding("text")
            )
          )
        )
      );
      //结束
      myDiagram.nodeTemplateMap.add(
        "End",
        $(
          go.Node,
          "Spot",
          this.nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(go.Shape, "Circle", {
              minSize: new go.Size(40, 40),
              fill: "rgb(201, 92, 81)", //颜色
              stroke: null
            }),
            $(
              go.TextBlock,
              "End",
              {
                font: "11pt Helvetica, Arial, sans-serif",
                stroke: lightText
              },
              new go.Binding("text")
            )
          )
          // makePort("T", go.Spot.Top, false, true),
          // makePort("L", go.Spot.Left, false, true)
          // makePort("R", go.Spot.Right, false, true)
        )
      );
      //点击事件,进行操作
      myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
        //e.subject.part.data数据源
        let obj = e.subject.part.data;
        obj.text = "我点击了";
        //_self才是vue的this
        console.log(obj);
        _self.load();
      });
    },
    load() {
      let data = [];
      this.chartData.nodeDataArray.forEach(n => {
        if (n.category === "Next") {
          n.state === "0" ? (n.category = "Next") : (n.category = "Next1");
          data.push(n);
        } else {
          data.push(n);
        }
      });
      myDiagram.model = new go.GraphLinksModel(
        data,
        this.chartData.linkDataArray
      );
    },
    gojsClick() {}
  }
};
</script>

