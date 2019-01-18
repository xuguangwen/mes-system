/*
 * @Author: xgw 
 * @Date: 2019-01-04 17:30:15 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-16 15:34:19
 */
<!--工业流程图-->
 <template>
  <div class="flowChart" v-loading="loading">
    <div class="patternChage">
    <el-switch v-model="pattern" active-text="添加附属信息" inactive-text="绘图模式" :width="50" @change='switchChange'>
    </el-switch>
    </div>
    <div id="chart-wrap" style="width: 100%; display: flex; justify-content: space-between">
      <div id="chart-palette" style="width: 200px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>
      <div id="chart-diagram" style="flex-grow: 1;min-height: 400px; border: solid 1px black"></div>
    </div>
    <!-- <el-button type="primary" @click="saveData">console数据</el-button> -->
    <el-dialog :title="EUData.execute_unit_name+'详情'" width="500px" :visible.sync="outerVisible" append-to-body>
      <el-form ref="form" :model="EUData" label-width="100px" label-position="left">
        <el-form-item label="负责人">
          <el-input v-model="EUData.responsibleName"></el-input>
        </el-form-item>
        <el-form-item label="执行单元名称">
          <span>{{EUData.execute_unit_name}}</span>
        </el-form-item>
        <el-form-item label="排产量">
          <span>{{filterFn.thousandSeparator(output)}}</span>
        </el-form-item>
        <el-form-item label="计划时间">
          <span>{{fiterTime(EUData.time[0])+'——'+fiterTime(EUData.time[1])}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { gojsUrl } from "@/api/cdn.js";
import utils from "@/utils/index";
export default {
  name: "flowChart",
  data() {
    return {
      pattern: false,
      gojsLoaded: false,
      loading:true,
      outerVisible: false,
      EUData: {
        execute_unit_name: "",
        responsibleName: "许广文",
        output:"1213455",
        time: ['2018-11-02 12:22:12','2019-01-11 13:03:34']
      }, //执行单元信息
      chartData: {
        class: "go.GraphLinksModel",
        linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
        nodeDataArray: [
          {
            category: "Start",
            text: "开始",
            key: 0,
            loc: "-980 -120",
            __gohashid: 10706
          },
          {
            category: "Next",
            text: "A执行单元",
            key: 1,
            loc: "-850 -120",
            __gohashid: 10707
          },
          {
            category: "Next",
            text: "B执行单元",
            key: 2,
            loc: "-550 -220",
            __gohashid: 10708
          },
          {
            category: "Next",
            text: "D执行单元",
            key: 4,
            loc: "-340 -220",
            __gohashid: 10710
          },
          {
            category: "Next",
            text: "F执行单元",
            key: 5,
            loc: "-350 0",
            __gohashid: 10711
          },
          {
            category: "End",
            text: "结束",
            key: 6,
            loc: "80 -120",
            __gohashid: 10712
          },
          {
            category: "Next",
            text: "C执行单元",
            key: -4,
            loc: "-550 0",
            __gohashid: 29696
          },
          {
            category: "warningNext",
            text: "紧急工序",
            key: -5,
            loc: "-140 -120",
            __gohashid: 37382
          },
          {
            category: "Comment",
            text: "加急工序",
            key: -3,
            loc: "-80 -170",
            __gohashid: 39327
          }
        ],
        linkDataArray: [
          {
            from: 0,
            to: 1,
            points: {
              __gohashid: 26056,
              P: true,
              n: [
                {
                  x: -958.1918773207555,
                  y: -119.9999999999999
                },
                {
                  x: -948.1918773207555,
                  y: -119.9999999999999
                },
                {
                  x: -926.8311617959412,
                  y: -119.9999999999999
                },
                {
                  x: -926.8311617959412,
                  y: -120.00000000000011
                },
                {
                  x: -905.4704462711268,
                  y: -120.00000000000011
                },
                {
                  x: -895.4704462711268,
                  y: -120.00000000000011
                }
              ],
              F: 0,
              Gb: null,
              Ti: null
            },
            __gohashid: 10721
          },
          {
            from: 1,
            to: 2,
            fromPort: "R",
            toPort: "L",
            points: {
              __gohashid: 34211,
              P: true,
              n: [
                {
                  x: -804.5295537288736,
                  y: -120.00000000000011
                },
                {
                  x: -794.5295537288736,
                  y: -120.00000000000011
                },
                {
                  x: -700,
                  y: -120.00000000000011
                },
                {
                  x: -700,
                  y: -219.99999999999997
                },
                {
                  x: -605.4704462711265,
                  y: -219.99999999999997
                },
                {
                  x: -595.4704462711265,
                  y: -219.99999999999997
                }
              ],
              F: 0,
              Gb: null,
              Ti: null
            },
            __gohashid: 10722
          },
          {
            from: 2,
            to: 4,
            fromPort: "R",
            toPort: "L",
            points: {
              __gohashid: 36610,
              P: true,
              n: [
                {
                  x: -504.52955372887334,
                  y: -219.99999999999997
                },
                {
                  x: -494.52955372887334,
                  y: -219.99999999999997
                },
                {
                  x: -440.20222091674805,
                  y: -219.99999999999997
                },
                {
                  x: -440.20222091674805,
                  y: -219.99999999999997
                },
                {
                  x: -395.87488810462276,
                  y: -219.99999999999997
                },
                {
                  x: -385.87488810462276,
                  y: -219.99999999999997
                }
              ],
              F: 0,
              Gb: null,
              Ti: null
            },
            __gohashid: 10723
          },
          {
            __gohashid: 30200,
            from: 1,
            to: -4,
            fromPort: "R",
            toPort: "L",
            points: {
              __gohashid: 39493,
              P: true,
              n: [
                {
                  x: -804.5295537288736,
                  y: -120.00000000000011
                },
                {
                  x: -794.5295537288736,
                  y: -120.00000000000011
                },
                {
                  x: -697.5554771423341,
                  y: -120.00000000000011
                },
                {
                  x: -697.5554771423341,
                  y: 0
                },
                {
                  x: -605.8748881046228,
                  y: 0
                },
                {
                  x: -595.8748881046228,
                  y: 0
                }
              ],
              F: 0,
              Gb: null,
              Ti: null
            }
          },
          {
            __gohashid: 31685,
            from: -4,
            to: 5,
            fromPort: "R",
            toPort: "L",
            points: {
              __gohashid: 39463,
              P: true,
              n: [
                {
                  x: -504.12511189537736,
                  y: 0
                },
                {
                  x: -494.12511189537736,
                  y: 0
                },
                {
                  x: -449.59198379516613,
                  y: 0
                },
                {
                  x: -449.59198379516613,
                  y: 0
                },
                {
                  x: -405.05885569495484,
                  y: 0
                },
                {
                  x: -395.05885569495484,
                  y: 0
                }
              ],
              F: 7,
              Gb: null,
              Ti: null
            }
          },
          {
            __gohashid: 37892,
            from: 4,
            to: -5,
            fromPort: "R",
            toPort: "L",
            points: {
              __gohashid: 37905,
              P: true,
              n: [
                {
                  x: -294.1251118953773,
                  y: -219.99999999999997
                },
                {
                  x: -284.1251118953773,
                  y: -219.99999999999997
                },
                {
                  x: -237.35325622558594,
                  y: -219.99999999999997
                },
                {
                  x: -237.35325622558594,
                  y: -120
                },
                {
                  x: -190.5814005557946,
                  y: -120
                },
                {
                  x: -180.5814005557946,
                  y: -120
                }
              ],
              F: 7,
              Gb: null,
              Ti: null
            }
          },
          {
            __gohashid: 38437,
            from: 5,
            to: -5,
            fromPort: "R",
            toPort: "L",
            points: {
              __gohashid: 38450,
              P: true,
              n: [
                {
                  x: -304.9411443050453,
                  y: 0
                },
                {
                  x: -294.9411443050453,
                  y: 0
                },
                {
                  x: -242.76127243041998,
                  y: 0
                },
                {
                  x: -242.76127243041998,
                  y: -120
                },
                {
                  x: -190.5814005557946,
                  y: -120
                },
                {
                  x: -180.5814005557946,
                  y: -120
                }
              ],
              F: 7,
              Gb: null,
              Ti: null
            }
          },
          {
            __gohashid: 38864,
            from: -5,
            to: 6,
            fromPort: "R",
            toPort: "L",
            points: {
              __gohashid: 38877,
              P: true,
              n: [
                {
                  x: -99.41859944420541,
                  y: -120
                },
                {
                  x: -89.41859944420541,
                  y: -120
                },
                {
                  x: -20.613361061725037,
                  y: -120
                },
                {
                  x: -20.613361061725037,
                  y: -119.9999999999999
                },
                {
                  x: 48.19187732075534,
                  y: -119.9999999999999
                },
                {
                  x: 58.19187732075534,
                  y: -119.9999999999999
                }
              ],
              F: 7,
              Gb: null,
              Ti: null
            }
          }
        ]
      }
    };
  },
  computed:{
    output: function () {
      return utils.numberFilter(this.EUData.output)
    }
  },
  mounted() {
    this.loadjs(gojsUrl).then(() => {
      this.loading=false;
      this.init();
    });
  },
  methods: {
    fiterTime(str){
      return utils.formatDate.format(new Date(str),'yyyy-MM-dd hh-mm-ss');
    },
    /************第二部分图行的绘制***********/
    //初始化e-r图
    init() {
      let _self = this;
      if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make; // for conciseness in defining templates
      //初始化绘图网格
      window.myDiagram = $(
        go.Diagram,
        "chart-diagram", // must name or refer to the DIV HTML element
        {
          grid: $(
            go.Panel,
            "Grid",
            $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineH", {
              stroke: "gray",
              strokeWidth: 0.5,
              interval: 10
            }),
            $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineV", {
              stroke: "gray",
              strokeWidth: 0.5,
              interval: 10
            })
          ),
          initialContentAlignment: go.Spot.Center,
          allowDrop: true, // must be true to accept drops from the Palette
          "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.portGravity": 20,
          "relinkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.portGravity": 20,
          LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
          LinkRelinked: showLinkLabel,
          scrollsPageOnFocus: false,
          "undoManager.isEnabled": true // enable undo & redo
        }
      );
      // 节点模板定义
      function nodeStyle() {
        return [
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          {
            //位置位于每个节点的中心
            locationSpot: go.Spot.Center,
            isShadowed: false,
            shadowColor: "#888",
            //处理鼠标进入/离开事件以显示/隐藏端口
            mouseEnter: function(e, obj) {
              _self.showPorts(obj.part, true);
            },
            mouseLeave: function(e, obj) {
              _self.showPorts(obj.part, false);
            }
          }
        ];
      }
      //output:输出，input：输入
      function makePort(name, spot, output, input) {
        //这个端口基本上就是一个小的圆圈当它被显示出来的时候它会有一个白色的笔画
        return $(go.Shape, "Circle", {
          fill: "transparent",
          stroke: null,
          desiredSize: new go.Size(10, 10),
          alignment: spot,
          alignmentFocus: spot,
          portId: name,
          fromSpot: spot,
          toSpot: spot,
          fromLinkable: output,
          toLinkable: input,
          cursor: "pointer"
        });
      }
      var lightText = "whitesmoke";
      //定义侧边图像模块
      myDiagram.nodeTemplateMap.add(
        "Next", // the default category
        $(
          go.Node,
          "Spot",
          nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(
              go.Shape,
              "RoundedRectangle",
              { fill: "rgb(16, 91, 89)", stroke: null },
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
          ),
          //限制链接顺序
          // makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true)
          // makePort("B", go.Spot.Bottom, true, false)
        )
      );
      myDiagram.nodeTemplateMap.add(
        "warningNext", // the default category
        $(
          go.Node,
          "Spot",
          nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(
              go.Shape,
              "RoundedRectangle",
              { fill: "rgb(230, 162, 60)", stroke: null },
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
          ),
          // four named ports, one on each side:
          // makePort("T", go.Spot.Top, true, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true)
          // makePort("B", go.Spot.Bottom, true, false)
        )
      );
      //判断，棱形
      myDiagram.nodeTemplateMap.add(
        "Judge", // the default category
        $(
          go.Node,
          "Spot",
          nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(
              go.Shape,
              "RoundedRectangle",
              { fill: "rgb(95, 189, 193)", stroke: null },
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
          ),
          // four named ports, one on each side:
          makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, true, false)
        )
      );
      //开始
      myDiagram.nodeTemplateMap.add(
        "Start",
        $(
          go.Node,
          "Spot",
          nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(go.Shape, "Circle", {
              minSize: new go.Size(40, 40),
              fill: "rgb(29, 180, 149)",
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
          ),
          // makePort("L", go.Spot.Left, true, false),
          makePort("R", go.Spot.Right, true, false)
          // makePort("B", go.Spot.Bottom, true, false)
        )
      );
      //结束
      myDiagram.nodeTemplateMap.add(
        "End",
        $(
          go.Node,
          "Spot",
          nodeStyle(),
          $(
            go.Panel,
            "Auto",
            $(go.Shape, "Circle", {
              minSize: new go.Size(40, 40),
              fill: "rgb(201, 92, 81)",
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
          ),
          // makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, false, true)
          // makePort("R", go.Spot.Right, false, true)
        )
      );
      //注释
      myDiagram.nodeTemplateMap.add(
        "Comment",
        $(
          go.Node,
          "Auto",
          nodeStyle(),
          $(go.Shape, "File", {
            fill: "rgb(230, 223, 204)",
            stroke: null
          }),
          $(
            go.TextBlock,
            {
              margin: 5,
              maxSize: new go.Size(200, NaN),
              wrap: go.TextBlock.WrapFit,
              textAlign: "center",
              editable: true,
              font: "12pt Helvetica, Arial, sans-serif",
              stroke: "rgb(54, 54, 54)"
            },
            new go.Binding("text").makeTwoWay()
          )
        )
      );
      // 替换默认模板,美化线条
      myDiagram.linkTemplate = $(
        go.Link, // the whole link panel
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4,
          relinkableFrom: true,
          relinkableTo: true,
          reshapable: true,
          resegmentable: true,
          adjusting: go.Link.Stretch,
          mouseEnter: function(e, link) {
            link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
          },
          mouseLeave: function(e, link) {
            link.findObject("HIGHLIGHT").stroke = "transparent";
          }
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape, {
          isPanelMain: true,
          strokeWidth: 8,
          stroke: "transparent",
          name: "HIGHLIGHT"
        }),
        $(go.Shape, {
          isPanelMain: true,
          stroke: "rgb(67, 67, 67)",
          strokeWidth: 1
        }),
        $(go.Shape, {
          toArrow: "standard",
          stroke: null,
          fill: "rgb(67, 67, 67)"
        }),
        $(
          go.Panel,
          "Auto",
          {
            visible: false,
            name: "LABEL",
            segmentIndex: 2,
            segmentFraction: 0.5
          },
          new go.Binding("visible", "visible").makeTwoWay(),
          $(
            go.Shape,
            "RoundedRectangle", // the label shape
            { fill: "rgb(101, 122, 151)", stroke: null }
          ),
          $(
            go.TextBlock,
            "是", // the label
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "rgb(255, 255, 255)",
              editable: true
            },
            new go.Binding("text").makeTwoWay()
          )
        )
      );
      //点击事件,进行操作
      myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
        //e.subject.part.data数据源
        let obj = e.subject.part.data;
        if (
          (obj.category === "Next" || obj.category === "warningNext") && _self.pattern
        ) {
          //判断点击的是实体=>附加信息框弹出
          _self.outerVisible = true;
          _self.EUData.execute_unit_name=obj.text;
        }
      });
      // 这个监听器是由“link绘制”和“链接”的图表所调用的。
      function showLinkLabel(e) {
        var label = e.subject.findObject("LABEL");
        if (label !== null)
          label.visible = e.subject.fromNode.data.figure === "Diamond";
      }
      myDiagram.toolManager.linkingTool.temporaryLink.routing =
        go.Link.Orthogonal;
      myDiagram.toolManager.relinkingTool.temporaryLink.routing =
        go.Link.Orthogonal;
      _self.load();
      // 初始化页面左边的调色板
      window.myPalette = $(go.Palette, "chart-palette", {
        scrollsPageOnFocus: false,
        nodeTemplateMap: myDiagram.nodeTemplateMap,
        model: new go.GraphLinksModel([
          { category: "Start", text: "开始" },
          { category: "Next", text: "执行单元" },
          { category: "warningNext", text: "特殊执行单元" },
          { category: "Comment", text: "注释" },
          {
            category: "Judge",
            text: "逻辑判断",
            figure: "Diamond"
          },
          { category: "End", text: "结束" }
        ])
      });
    },
    showPorts(node, show) {
      var diagram = node.diagram;
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
      node.ports.each(function(port) {
        port.stroke = show ? "white" : null;
      });
    },
    //初始化date数组绘图
    load() {
      myDiagram.model = go.Model.fromJson(this.chartData);
      myDiagram.model.linkFromPortIdProperty = "fromPort";
      myDiagram.model.linkToPortIdProperty = "toPort";
      // myDiagram.isReadOnly = true; //允许用户滚动和缩放，并选择部分，但不插入、删除或拖动或修改部件
      // myDiagram.isReadOnly = !this.pattern; //允许用户滚动和缩放，并选择部分，但不插入、删除或拖动或修改部件
    },
    switchChange(val){
      myDiagram.isReadOnly=val;
    },
    saveData() {
      console.log(
        "链接顺序：",
        JSON.stringify(this.chartData.linkDataArray),
        "实体数组：",
        JSON.stringify(this.chartData.nodeDataArray)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.flowChart {
  padding: 10px;
  .patternChage {
    margin: 20px 0;
  }
}
</style>

