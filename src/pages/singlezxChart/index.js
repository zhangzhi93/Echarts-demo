import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import '../../style/theme.less';

window.onload = function () {
  const nodeid = util.getParaValueByName('nodeid');
  const type = util.getParaValueByName('type');
  const buildid = util.getParaValueByName('buildid');
  const cs = util.getParaValueByName('c_s');
  axios.get(`${util.Base.contextPath}yh_singlenode_show_1_0${util.Base.endPath}`, {
    params: {
      nodeid: nodeid,
      buildid: buildid,
      type: type
    }
  })
    .then(function (res) {
      const data = res.data;
      if (data.result == 0) {
        if (data.build_date_list.length == 0) {
          util.Alert(cs, '没有查询到相关记录');
        } else {
          window.Data = data.build_date_list;
          window.nodename = data.nodename;
          renderPage(data.build_date_list);
          document.addEventListener("click", function (event) {
            var target = event.target;
            if (target.nodeName == "A") {
              let index = target.getAttribute("id");
              deleteJD(index);
            }
          })
        }
      } else {
        util.Alert(cs, data.message);
      }
    })
    .catch(function (error) {
      util.Alert(cs, error);
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
    legend: {
      top: 10,
      data: [window.nodename]
    },
    xAxis: {
      type: 'category',
      data: data.map(h => `${h.area_name + h.build_name}`),
      splitLine: {
        show: true
      },
      axisTick: {
        interval: 0
      },
      axisLabel: {
        interval: 0,
        rotate: -45
      },
    },
    yAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel: {
        rotate: 60,
        formatter: function (value, index) {
          var date = new Date(value);
          var texts = [(date.getYear().toString()).slice(-2),(date.getMonth() + 1), date.getDate()];
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
        name: window.nodename,
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
                <td>${val.area_name + val.build_name}</td>
                <td>${val.complete_date}</td>
                <td><a href="javascript:" id="${i}">删除</a></td>
              </tr>`).join('')}
          </tbody>
      </table>
    </div>`;
  myChart.setOption(option, true);
  tableDom.innerHTML = tmpl;
}

function deleteJD(i) {
  window.Data.splice(i, 1);
  renderPage(window.Data);
}
