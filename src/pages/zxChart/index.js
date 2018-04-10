import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markLine';
import '../../style/theme.less';

window.onload = function () {
  axios.get(`${util.Base.contextPath}yh_doublenode_show_1_0${util.Base.endPath}`, {
    params: {
      beginnodeid: '2',
      endnodeid: '3',
      buildid: '5,6'
    }
  })
    .then(function (res) {
      const data = res.data;
      if (data.result == 0) {
        renderPage(data.collect);
      } else {
        alert(data.message);
      }
    })
    .catch(function (error) {
      alert(error);
    });
}

function renderPage(data) {
  const dom = document.getElementById("main");
  const myChart = echarts.init(dom);
  const tableDom = document.getElementById('table_container');
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.map(h => h.house),
      splitLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      max: function (val) {
        return val.max + 5;
      },
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
        name: '桩基开工-土方完成',
        type: 'line',
        data: data.map(h => h.days),
        markLine: {
          symbol: "none",
          data: [
            {
              name: '平均线',
              type: 'average',
              lineStyle: {
                normal: {
                  color: "blue",
                  width: 2,
                  type: "solid",
                }
              }
            }]
        }
      }
    ]
  };
  let tmpl = `
    <div class="div-head">
      <table cellspacing=0>
        <thead>
          <th>楼栋</th>
          <th>天数</th>
          <th>操作</th>
        </thead>
      </table>
    </div>
    <div class="div-body">
      <table cellspacing=0>
        <tbody class="col-3">
          ${data.map(val => `
            <tr>
              <td colspan="3">${val.name}</td>
            </tr>
          </tbody>`).join('')}
      </table>
    </div>`;

  myChart.setOption(option, true);

  tableDom.innerHTML = tmpl;
}
