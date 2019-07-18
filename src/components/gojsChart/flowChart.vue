/*
 * @Author: xgw 
 * @Date: 2019-05-06 09:49:31 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-24 20:59:40
 */
<!--工业流程图-->
<template>
  <div class="flowChart" style="width: 100%; display: flex; justify-content: space-between">
    <div :id="'palette-'+name" style="width: 200px; margin-right: 2px; background-color: #fff; border: solid 1px #aaa" v-if=palette></div>
    <div :id="'diagram-'+name" :class="[pattern?'drawPattern':'lookPattern']"></div>
  </div>
</template>
<script>
export default {
  name: "flowChart",
  props: {
    //模式，默认true可以绘图
    pattern: {
      type: Boolean,
      default: false
    },
    //有无工具栏,true有
    palette:{
      type:Boolean,
      default:false
    },
    //绘图是否有网格
    grid:{
      type:Boolean,
      default:false
    },
    //是否支持自定义执行单元名称
    EUeditable:{
      type:Boolean,
      default:true
    },
    name: {
      type: String,
      default: ""
    },
    nodeDataArray: {
      type: Array,
      default: () => []
    },
    linkDataArray: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
    this.init();
    this.load();
  },
  methods: {
    //初始化
    init() {
      let _self = this;
      let go = this.gojs;
      if (window.goSamples) goSamples();
      let $ = go.GraphObject.make;
      let gridPattern = $(
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
      );
      window.myDiagram = $(
        go.Diagram,
        "diagram-" + _self.name, // must name or refer to the DIV HTML element
        {
          grid: _self.grid ? gridPattern : null,
          initialContentAlignment: go.Spot.Center,
          allowDrop: true,
          "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.portGravity": 20,
          "relinkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.portGravity": 20,
          LinkDrawn: _self.showLinkLabel,
          LinkRelinked: _self.showLinkLabel,
          scrollsPageOnFocus: false,
          "undoManager.isEnabled": true
        }
      );
      var lightText = "whitesmoke";
      //定义侧边图像模块 Next未绑定工序模块
      myDiagram.nodeTemplateMap.add(
        "Next",
        $(
          go.Node,
          "Spot",
          _self.nodeStyle(),
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
                // editable: true
                editable: _self.EUeditable,//是否可以编辑
              },
              new go.Binding("text").makeTwoWay()
            )
          ),
          //限制链接顺序
          _self.makePort("L", go.Spot.Left, true, true),
          _self.makePort("R", go.Spot.Right, true, true)
        )
      );
      //绑定的状态
      myDiagram.nodeTemplateMap.add(
        "Next1",
        $(
          go.Node,
          "Spot",
          _self.nodeStyle(),
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
                editable: _self.EUeditable,//是否可以编辑
              },
              new go.Binding("text").makeTwoWay()
            )
          ),
          _self.makePort("L", go.Spot.Left, true, true),
          _self.makePort("R", go.Spot.Right, true, true)
        )
      );
      //开始
      myDiagram.nodeTemplateMap.add(
        "Start",
        $(
          go.Node,
          "Spot",
          _self.nodeStyle(),
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
          ),
          _self.makePort("R", go.Spot.Right, true, false)
        )
      );
      //结束
      myDiagram.nodeTemplateMap.add(
        "End",
        $(
          go.Node,
          "Spot",
          _self.nodeStyle(),
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
          ),
          _self.makePort("L", go.Spot.Left, false, true)
        )
      );
      myDiagram.toolManager.linkingTool.temporaryLink.routing =
        go.Link.Orthogonal;
      myDiagram.toolManager.relinkingTool.temporaryLink.routing =
        go.Link.Orthogonal;
      if (_self.palette) {
        // 初始化页面左边的调色板
        window.myPalette = $(go.Palette, "palette-" + _self.name, {
          scrollsPageOnFocus: false,
          nodeTemplateMap: myDiagram.nodeTemplateMap,
          model: new go.GraphLinksModel([
            { category: "Start", text: "开始" },
            { category: "End", text: "结束" },
            { category: "Next", text: "操作单元"}
          ])
        });
      }
      if(_self.pattern){
        myDiagram.isReadOnly = false; 
      }else{
        myDiagram.isReadOnly = true; //true:只读
      }
      //点击事件,进行操作
      myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
        //e.subject.part.data数据源
        let obj = e.subject.part.data;
        if(obj.category==="Start"||obj.category==="End"){
          return false
        }else{
          _self.$emit("sendPaletteData",obj)
        }
        // _self.load();
      });
    },
    // 这个监听器是由“link绘制”和“链接”的图表所调用的。
    showLinkLabel(e) {
      var label = e.subject.findObject("LABEL");
      if (label !== null)
        label.visible = e.subject.fromNode.data.figure === "Diamond";
    },
    // 节点模板定义
    nodeStyle() {
      let _self = this;
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
    },
    //输入与输出定义
    makePort(name, spot, output, input) {
      let go = this.gojs;
      if (window.goSamples) goSamples();
      let $ = go.GraphObject.make;
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
    },
    //链接出现小圆点提示
    showPorts(node, show) {
      var diagram = node.diagram;
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
      node.ports.each(function(port) {
        port.stroke = show ? "white" : null;
      });
    },
    //绘图
    load() {
      myDiagram.model = new go.GraphLinksModel(
        this.nodeDataArray,
        this.linkDataArray
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.drawPattern {
  flex-grow: 1;
  border: solid 1px #aaa;
  background-color: #fff;
  min-height: 400px;
}
.lookPattern {
  flex-grow: 1;
  min-height: 200px;
  background-color: #fff;
  // border-radius: 10px;
  // border: solid 1px #aaa;
}
</style>




