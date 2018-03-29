import * as echarts from 'echarts';

window.onload = function () {
  let dom = document.getElementById("main");
  let myChart = echarts.init(dom);
  let option = null;
  let html = '';
  const symbolSize = 5;
  const xData = ['节点1', '节点2', '节点3', '节点4', '节点5', '节点6', '节点7'];
  const yData = ['#1', '#2', '#3', '#4', '#5', '#6', '#7'];
  const data = [['节点6', '#1'], ['节点4', '#2'], ['节点3', '#3'], ['节点2', '#4'], ['节点7', '#5'], ['节点1', '#6'], ['节点5', '#7']]
  //const data = [[15, 0],[16, 5],[25, 10],[32, 3],[60, 23.2], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

  option = {
    title: {
      text: 'Try Dragging these Points'
    },
    tooltip: {
      triggerOn: 'none',
      formatter: function (params) {
        return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
      }
    },
    grid: {
    },
    xAxis: {
      type: 'category',
      nameLocation: 'start',
      boundaryGap:false,
      data: xData
    },
    yAxis: {
      type: 'category',
      nameLocation: 'start',
      boundaryGap:false,
      data: yData
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
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbolSize: symbolSize,
        connectNulls: true,
        data: data
      }
    ]
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }

  data.forEach((val, idx) => {
    html += `<tr><td>${val[1]}</td><td>${val[0]}</td><td><a href='javascript:'>删除123456</a></td></tr>`;
  })
  document.getElementById('table_list').innerHTML = html;
  // echarts.init(document.getElementById('main')).setOption({
  // 	series: {
  // 		type: 'pie',
  // 		data: [{
  // 			name: 'A',
  // 			value: 1212
  // 		}, {
  // 			name: 'B',
  // 			value: 2323
  // 		}, {
  // 			name: 'C',
  // 			value: 1919
  // 		}]
  // 	}
  // });
  // let outRender = () => Math.random();
  // const htmlData = {
  // 	renderText() {
  // 		return Math.random();
  // 	}
  // }
  // document.getElementById("text").innerHTML = htmlData.renderText() + 'dd' + outRender();
}
