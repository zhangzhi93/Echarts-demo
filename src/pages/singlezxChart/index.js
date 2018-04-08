import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import css from '../../style/theme.less';

window.onload = function () {
  const dom = document.getElementById("main");
  const myChart = echarts.init(dom);
  let Data = [{
    house: '1#',
    date: '2018-02-12',
  }, {
    house: '2#',
    date: '2018-03-02',
  }, {
    house: '3#',
    date: '2018-05-20',
  }, {
    house: '4#',
    date: '2018-01-18',
  }, {
    house: '5#',
    date: '2018-01-11',
  }, {
    house: '6#',
    date: '2018-02-02',
  }, {
    house: '7#',
    date: '2018-05-10',
  }];
  const option = {
    backgroundColor:'#FEFAF4',
    tooltip: {
      formatter: '{a} <br/> {b}：{c}'
    },
    xAxis: {
      type: 'category',
      data: Data.map(h => h.house),
      splitLine: {
        show: true
      }
    },
    yAxis: {
      type: 'time',
      min: new Date('2018-01-01'),
      max: new Date('2018-06-01'),
      axisLabel: {
        formatter: function (value, index) {
          var date = new Date(value);
          var texts = [(date.getMonth() + 1), date.getDate()];
          if (index === 0) {
            texts.unshift(date.getYear());
          }
          return texts.join('-');
        }
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
        name: '节点名称',
        type: 'line',
        data: Data.map(h => h.date),
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
          <th>日期</th>
          <th>操作</th>
        </thead>
      </table>
    </div>
    <div class="div-body">
      <table cellspacing=0>
        <tbody class="col-3">
          ${Data.map(val => `
              <tr>
                <td>${val.house}</td>
                <td>${val.date}</td>
                <td><a href="javascript:" id="${val.house}">删除</a></td>
              </tr>
          </tbody>`).join('')}
      </table>
    </div>`;
  tableDom.innerHTML = tmpl;
}
