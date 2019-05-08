/*
 * @Author: xgw 
 * @Date: 2019-05-06 10:02:43 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-05-07 10:23:07
 */
<!--实验工业流程图的抽离-->
<template>
  <div class="flowDome">
    <div class="one">
      <flow-chart :nodeDataArray=nodeDataArray :linkDataArray=linkDataArray :pattern=pattern :name="'1'"></flow-chart>
    </div>
  </div>
</template>
<script>
import flowChart from "@/components/flowChart";
export default {
  name: "flowDome",
  components: {
    flowChart
  },
  mounted() {
  },
  data() {
    return {
      pattern: true,
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
    };
  },
  methods: {}
};
</script>

