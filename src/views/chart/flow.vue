/*
 * @Author: xgw 
 * @Date: 2019-01-04 17:30:15 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-01-04 18:12:36
 */
<!--工业流程图-->
 <template>
  <div id="wrap">
    <div id="chart-wrap" style="width: 100%; display: flex; justify-content: space-between">
      <div id="chart-palette"
           style="width: 200px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>
      <div id="chart-diagram" style="flex-grow: 1;min-height: 500px; border: solid 1px black"></div>
    </div>
  </div>
</template>

<script>
import { gojsUrl } from "@/api/cdn.js";
export default {
  name: "flowChart",
  data() {
    return {
      gojsLoaded: false,
      chartData: {
        class: "go.GraphLinksModel",
        linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
        nodeDataArray: [],
        linkDataArray: []
      }
    };
  },
  mounted() {
    this.loadjs(gojsUrl).then(() => {
      this.init();
    });
  },
  methods: {
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
              { fill: "rgb(0, 153, 153)", stroke: null },
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
        if ((obj.category === "Next" || obj.category === "warningNext") && !_self.calculate) {
          //判断点击的是实体=>附加信息框弹出
          // _self.outerVisible = true;
          // _self.queryPlanProductionUnit(_self.planId, obj.key);
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
          // specify the contents of the Palette
          { category: "Start", text: "开始" },
          // {
          //   category: "Judge",
          //   text: "逻辑判断",
          //   figure: "Diamond"
          // },
          { category: "End", text: "结束" },
          { category: "Comment", text: "注释" },
          { category: "Next", text: "执行单元" },
          { category: "warningNext", text: "特殊执行单元" }
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
      myDiagram.model.linkFromPortIdProperty = "fromPort"; //必须记住portIds
      myDiagram.model.linkToPortIdProperty = "toPort";
      // myDiagram.isReadOnly = true; //允许用户滚动和缩放，并选择部分，但不插入、删除或拖动或修改部件
    },
  }
};
</script>
