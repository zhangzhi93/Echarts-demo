import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import '../../style/theme.less';

window.onload = function () {
  const beginnodeid = util.getParaValueByName('beginnodeid');
  const endnodeid = util.getParaValueByName('endnodeid');
  const buildid = util.getParaValueByName('buildid');
  const cs = util.getParaValueByName('c_s');
  axios.get(`${util.Base.contextPath}yh_doublenode_show_1_0${util.Base.endPath}`, {
    params: {
      beginnodeid: beginnodeid,
      endnodeid: endnodeid,
      buildid: buildid
    }
  })
    .then(function (res) {
      const data = res.data;
      if (data.result == 0) {
        if (data.collect.length == 0) {
          util.Alert(cs, '没有查询到相关记录');
        } else {
          window.Data = data.collect;
          window.nodename = data.nodename;
          renderPage(data.collect);
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

function renderPage(data, node) {
  const dom = document.getElementById("main");
  const myChart = echarts.init(dom);
  const tableDom = document.getElementById('table_container');
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: 10,
      data: [window.nodename]
    },
    xAxis: {
      type: 'category',
      data: data.map(h => `${h.area + h.house}`),
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
        name: window.nodename,
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
  var map = {},
    dest = [];
  for (var i = 0; i < data.length; i++) {
    let val = data[i];
    val.id = i;
    if (!map[val.name]) {
      dest.push({
        name: val.name,
        collect: [val]
      });
      map[val.name] = val;
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj.name == val.name) {
          dj.collect.push(val);
          break;
        }
      }
    }
  }
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
          ${dest.map(val => `
            <tr>
              <td colspan="3">${val.name}</td>
            </tr>
            ${val.collect.map(col => `
              <tr>
                <td>${col.house}</td>
                <td>${col.days}</td>
                <td><a href="javascript:" id="${col.id}">删除</a></td>
              </tr>`).join('')}
          `).join('')}
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
