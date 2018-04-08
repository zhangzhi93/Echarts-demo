import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markLine';
import css from '../../style/theme.less';

window.onload = function () {
  const dom = document.getElementById("main");
  const myChart = echarts.init(dom);
  let Data = [{
    name: '华东一区地块 北区',
    collect: [{
      house: '1#',
      days: 5,
    }, {
      house: '2#',
      days: 8
    }, {
      house: '3#',
      days: 2
    }, {
      house: '4#',
      days: 3
    }]
  }, {
    name: '华东二区地块 北区',
    collect: [{
      house: '1#',
      days: 6
    }, {
      house: '2#',
      days: 1
    }, {
      house: '3#',
      days: 9
    }, {
      house: '4#',
      days: 4
    }, {
      house: '5#',
      days: 2
    }]
  }];
  let lsXData = new Array(),
    lsYData = new Array();
  Data.forEach((val, i) => {
    let Xcollect = val.collect.map(h => h.house);
    let Ycollect = val.collect.map(h => h.days)
    lsXData.push(...Xcollect);
    lsYData.push(...Ycollect);
  })
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: lsXData,
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
        name: '桩基开工-土方完成',
        type: 'line',
        data: lsYData,
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
        <tbody class="col-3">
          ${Data.map(val => `
            <tr>
              <td colspan="3">${val.name}</td>
            </tr>
            ${val.collect.map(col => `
              <tr>
                <td>${col.house}</td>
                <td>${col.days}</td>
                <td><a href="javascript:" id="${col.house}">删除</a></td>
              </tr>
            `).join('')}
          </tbody>`).join('')}
      </table>
    </div>`;
  tableDom.innerHTML = tmpl;
}
