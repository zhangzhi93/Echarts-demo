import * as echarts from 'echarts';
import css from '../../style/theme.less';

window.onload = function () {
  const dom = document.getElementById("main");
  const myChart = echarts.init(dom);
  let option = null;
  option = {
    tooltip: {
      trigger:'axis'
    },
    legend: {
      top:'10',
      data:[{
        name:'桩基开工',
        icon:'circle'
      },{
        name:'土方完成',
        icon:'diamond'
      }]
    },
    xAxis: {
      type: 'category',
      data: ['1#', '2#', '3#', '4#']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}天'
      }
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty',
        start: 0,
        end: 50,
      }
    ],
    series: [
      {
        name: '桩基开工',
        type: 'line',
        data: [8, 15, 35, 20]
      },
      {
        name: '土方完成',
        type: 'line',
        data: [5, 10, 28, 16]
      }
    ]
  };
  ;
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}
