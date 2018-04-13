import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/grid';
import css from '../../style/theme.less';

window.onload = function () {
  const yetaiid = util.getParaValueByName('yetaiid');
  const type = util.getParaValueByName('type');
  const areaid = util.getParaValueByName('areaid');
  const groupid = util.getParaValueByName('groupid');
  const cs = util.getParaValueByName('c_s');
  axios.get(`${util.Base.contextPath}yh_yetai_show_1_0${util.Base.endPath}`, {
    params: {
      yetaiid: yetaiid,
      type: type,
      areaid: areaid,
      groupid: groupid
    }
  })
    .then(function (res) {
      const data = res.data;
      if (data.result == 0) {
        if (data.collect.length == 0) {
          util.Alert(cs, '没有查询到相关记录');
        } else {
          window.Data = data.collect;
          window.nodeList = data.node_list;
          renderPage(data.collect);
        }
        document.addEventListener("click", function (event) {
          var target = event.target;
          if (target.nodeName == "A") {
            let index = target.getAttribute("id");
            deleteJD(index);
          }
        })
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
  const tableDom = document.getElementById('table_container');
  const myChart = echarts.init(dom);
  let option = {
    grid: {
      top: 20
    },
    tooltip: {
      triggerOn: 'none',
      formatter: function (params) {
        return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
      }
    },
    xAxis: {
      type: 'category',
      //boundaryGap: false,
      axisTick: {
        interval: 0
      },
      axisLabel: {
        interval: 0,
        rotate: -45
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted'
        }
      },
      data: window.nodeList
    },
    yAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted'
        }
      },
      data: data.map((val) => val.house),
      axisLabel: {
        formatter: value => value.slice(-2)
      }
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty',
        startValue: 0,
        endValue: 6
      }
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbolSize: 5,
        data: data.map(val => [val.jiedian, val.house])
      }
    ]
  };
  let tmpl = `
    <div class="div-head">
      <table cellspacing=0>
        <thead class="col-3">
          <th>楼栋</th>
          <th>当前节点</th>
          <th>操作</th>
        </thead>
      </table>
    </div>
    <div class="div-body">
      <table cellspacing=0>
        <tbody class="col-3">
          ${data.map((val, i) => `
            <tr>
              <td>${val.house.slice(-2)}</td>
              <td>${val.jiedian}</td>
              <td><a href="javascript:" id="${i}">删除</a></td>
            </tr>
          </tbody>`).join('')}
      </table>
    </div>`;
  myChart.setOption(option, true);
  tableDom.innerHTML = tmpl;
}

function deleteJD(i) {
  window.Data.splice(i, 1);
  renderPage(window.Data);
}
