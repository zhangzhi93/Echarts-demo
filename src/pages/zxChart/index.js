import * as echarts from 'echarts';
import css from '../../style/theme.less';

window.onload = function () {
  const dom = document.getElementById("main");
  const myChart = echarts.init(dom);
  let Data = [{
    house: '1#',
    kg: 8,
    tf: 5
  }, {
    house: '2#',
    kg: 15,
    tf: 10
  }, {
    house: '3#',
    kg: 35,
    tf: 28
  }, {
    house: '4#',
    kg: 20,
    tf: 16
  }, {
    house: '5#',
    kg: 18,
    tf: 15
  }, {
    house: '6#',
    kg: 27,
    tf: 26
  }, {
    house: '7#',
    kg: 13,
    tf: 10
  }, {
    house: '8#',
    kg: 17,
    tf: 14
  }];
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '10',
      data: [{
        name: '桩基开工',
        icon: 'circle'
      }, {
        name: '土方完成',
        icon: 'diamond'
      }]
    },
    xAxis: {
      type: 'category',
      data: Data.map(val => val.house),
      splitLine: {
        show: true
      }
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
        data: Data.map(val => val.kg),
        markLine: {
          symbol: "none",
          data: [
            {
              name: '平均线',
              type: 'average',
              lineStyle: {
                normal: {
                  color: "red",
                  width: 2,
                  type: "solid",
                }
              }
            }]
        }
      }, {
        name: '土方完成',
        type: 'line',
        data: Data.map(val => val.tf)
      }
    ]
  };

  myChart.setOption(option, true);

  const tableDom = document.getElementById('table_container');
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
        <tbody>
          ${Data.map(val => `
            <tr>
              <td>${val.house}</td>
              <td>${val.kg}</td>
              <td>删除</td>
            </tr>
          </tbody>`).join('')}
      </table>
    </div>`;
  tableDom.innerHTML = tmpl;
}
