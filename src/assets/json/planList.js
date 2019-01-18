export default [
  {
    plan_id: "1",
    name: "钢笔生产订单（001）2018-03-04", //名称
    plan_batch: "2018年钢笔生产（001）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-11 12:30:00',//暂停开始
        pause_end_time:'2018-08-11 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-12 12:30:00',//暂停开始
        pause_end_time:'2018-08-12 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-13 09:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "2",
    name: "钢笔生产订单（002）2018-08-04", //名称
    plan_batch: "2018年钢笔生产（002）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "12222", //实际产出量
    plan_output: "1331", //排产量
    plan_start_time: "2018-08-11 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-10 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-11 12:30:00',//暂停开始
        pause_end_time:'2018-08-11 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-12 09:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
    ]
  },
  {
    plan_id: "3",
    name: "钢笔生产订单（003）2018-09-01", //名称
    plan_batch: "2018年钢笔生产（002）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-14 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-11 12:30:00',//暂停开始
        pause_end_time:'2018-08-11 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-12 12:30:00',//暂停开始
        pause_end_time:'2018-08-12 14:30:00',//暂停结束
      }
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
    ]
  },
  {
    plan_id: "4",
    name: "钢笔生产订单（004）2018-10-24", //名称
    plan_batch: "2018年钢笔生产（004）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-12 09:00:00",//计划开始
    plan_end_time: "2018-08-16 15:00:00",//计划结束
    actual_start_time: "2018-08-12 09:00:00",//实际开始
    actual_end_time: "2018-08-16 15:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-12 16:30:00',//暂停开始
        pause_end_time:'2018-08-13 09:00:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-13 18:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "5",
    name: "钢笔生产订单（005）2018-10-21", //名称
    plan_batch: "2018年钢笔生产（005）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "6",
    name: "钢笔生产订单（006）2018-10-26", //名称
    plan_batch: "2018年钢笔生产（006）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 09:00:00",//计划开始
    plan_end_time: "2018-08-16 15:00:00",//计划结束
    actual_start_time: "2018-08-10 09:00:00",//实际开始
    actual_end_time: "2018-08-16 15:00:00",//实际结束
    plan_pause:[

    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },

  {
    plan_id: "7",
    name: "钢笔生产订单（003）2018-09-01", //名称
    plan_batch: "2018年钢笔生产（002）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-14 12:00:00",//计划结束
    actual_start_time: "",//实际开始
    actual_end_time: "",//实际结束
    plan_pause:[
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
    ]
  },
  {
    plan_id: "8",
    name: "钢笔生产订单（004）2018-10-24", //名称
    plan_batch: "2018年钢笔生产（004）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-12 09:00:00",//计划开始
    plan_end_time: "2018-08-16 15:00:00",//计划结束
    actual_start_time: "2018-08-12 09:00:00",//实际开始
    actual_end_time: "2018-08-16 15:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-12 16:30:00',//暂停开始
        pause_end_time:'2018-08-13 09:00:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-13 18:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "9",
    name: "钢笔生产订单（005）2018-10-21", //名称
    plan_batch: "2018年钢笔生产（005）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },


  {
    plan_id: "10",
    name: "钢笔生产订单（001）2018-03-04", //名称
    plan_batch: "2018年钢笔生产（001）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-11 12:30:00',//暂停开始
        pause_end_time:'2018-08-11 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-12 12:30:00',//暂停开始
        pause_end_time:'2018-08-12 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-13 09:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "11",
    name: "钢笔生产订单（002）2018-08-04", //名称
    plan_batch: "2018年钢笔生产（002）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "12222", //实际产出量
    plan_output: "1331", //排产量
    plan_start_time: "2018-08-11 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "",//实际开始
    actual_end_time: "",//实际结束
    plan_pause:[
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
    ]
  },
  {
    plan_id: "13",
    name: "钢笔生产订单（003）2018-09-01", //名称
    plan_batch: "2018年钢笔生产（002）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-14 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-11 12:30:00',//暂停开始
        pause_end_time:'2018-08-11 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-12 12:30:00',//暂停开始
        pause_end_time:'2018-08-12 14:30:00',//暂停结束
      }
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
    ]
  },
  {
    plan_id: "14",
    name: "钢笔生产订单（004）2018-10-24", //名称
    plan_batch: "2018年钢笔生产（004）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-12 09:00:00",//计划开始
    plan_end_time: "2018-08-16 15:00:00",//计划结束
    actual_start_time: "2018-08-12 09:00:00",//实际开始
    actual_end_time: "2018-08-16 15:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-12 16:30:00',//暂停开始
        pause_end_time:'2018-08-13 09:00:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-13 18:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "15",
    name: "钢笔生产订单（005）2018-10-21", //名称
    plan_batch: "2018年钢笔生产（005）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "16",
    name: "钢笔生产订单（006）2018-10-26", //名称
    plan_batch: "2018年钢笔生产（006）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 09:00:00",//计划开始
    plan_end_time: "2018-08-16 15:00:00",//计划结束
    actual_start_time: "",//实际开始
    actual_end_time: "",//实际结束
    plan_pause:[

    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },

  {
    plan_id: "112",
    name: "钢笔生产订单（002）2018-08-04", //名称
    plan_batch: "2018年钢笔生产（002）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "12222", //实际产出量
    plan_output: "1331", //排产量
    plan_start_time: "2018-08-11 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-10 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-11 12:30:00',//暂停开始
        pause_end_time:'2018-08-11 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-12 09:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
    ]
  },
  {
    plan_id: "123",
    name: "钢笔生产订单（003）2018-09-01", //名称
    plan_batch: "2018年钢笔生产（002）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-14 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-11 12:30:00',//暂停开始
        pause_end_time:'2018-08-11 14:30:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-12 12:30:00',//暂停开始
        pause_end_time:'2018-08-12 14:30:00',//暂停结束
      }
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
    ]
  },
  {
    plan_id: "134",
    name: "钢笔生产订单（004）2018-10-24", //名称
    plan_batch: "2018年钢笔生产（004）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-12 09:00:00",//计划开始
    plan_end_time: "2018-08-16 15:00:00",//计划结束
    actual_start_time: "2018-08-12 09:00:00",//实际开始
    actual_end_time: "2018-08-16 15:00:00",//实际结束
    plan_pause:[
      {
        pause_start_time:'2018-08-12 16:30:00',//暂停开始
        pause_end_time:'2018-08-13 09:00:00',//暂停结束
      },
      {
        pause_start_time:'2018-08-13 18:00:00',//暂停开始
        pause_end_time:'2018-08-14 09:00:00',//暂停结束
      },
    ],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
  {
    plan_id: "153",
    name: "钢笔生产订单（005）2018-10-21", //名称
    plan_batch: "2018年钢笔生产（005）", //批次
    plan_responsible: "许广文", //负责人
    craftProductionSchedule: "25%", //进度
    plan_actual_output: "1323", //实际产出量
    plan_output: "13231", //排产量
    plan_start_time: "2018-08-10 06:00:00",//计划开始
    plan_end_time: "2018-08-16 12:00:00",//计划结束
    actual_start_time: "2018-08-11 09:00:00",//实际开始
    actual_end_time: "2018-08-15 16:00:00",//实际结束
    plan_pause:[],
    planProductionUnits: [
      {
        execute_unit_name: "执行单元A",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-15",
        unit_actual_start_time: "2018-08-15",
        unit_actual_end_time: "2018-08-17",
      },
      {
        execute_unit_name: "执行单元B",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-17",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-20",
      },
      {
        execute_unit_name: "执行单元C",
        unit_scheduled_start_time: "2018-08-12",
        unit_scheduled_end_time: "2018-08-18",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }, 
      {
        execute_unit_name: "执行单元D",
        unit_scheduled_start_time: "2018-08-10",
        unit_scheduled_end_time: "2018-08-25",
        unit_actual_start_time: "2018-08-11",
        unit_actual_end_time: "2018-08-13",
      }
    ]
  },
]
