import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import css from '../../style/theme.less';

window.onload = function () {
  axios.get(`${util.Base.contextPath}yh_singlenode_show_1_0${util.Base.endPath}`, {
    params: {
      nodeid: '2',
      buildid: '5,6'
    }
  })
    .then(function (res) {
      const data = res.data;
      if (data.result == 0) {
        renderPage(data.build_date_list);
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
    backgroundColor: '#FEFAF4',
    tooltip: {
      formatter: '{a} <br/> {b}：{c}'
    },
    xAxis: {
      type: 'category',
      data: data.map(h => h.build_name),
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
        type: 'line',
        data: data.map(h => h.complete_date),
      }
    ]
  };
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
          ${data.map((val, i) => `
              <tr>
                <td>#${val.build_name}</td>
                <td>${val.complete_date}</td>
                <td><a href="javascript:" id="${i}">删除</a></td>
              </tr>
          </tbody>`).join('')}
      </table>
    </div>`;
  tableDom.innerHTML = tmpl;
  myChart.setOption(option, true);
}
