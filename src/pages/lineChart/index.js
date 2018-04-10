import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
import css from '../../style/theme.less';

window.onload = function () {
  const yetaiid = util.getParaValueByName('yetaiid');
  const type = util.getParaValueByName('type');
  const areaid = util.getParaValueByName('areaid');
  const groupid = util.getParaValueByName('groupid');
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
        renderPage(data.collect,data.node_list);
        document.addEventListener("click", function (event) {
          var target = event.target;
          if (target.nodeName == "A") {
            let index = target.getAttribute("id");
            deleteJD(index);
          }
        })
      } else {
        alert(data.message);
      }
    })
    .catch(function (error) {
      alert(error);
    });
}

function renderPage(data,list) {
  const dom = document.getElementById("main");
  const tableDom = document.getElementById('table_container');
  const myChart = echarts.init(dom);
  let option = {
    title: {
      text: '同业态分析结果'
    },
    tooltip: {
      triggerOn: 'none',
      formatter: function (params) {
        return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: list
    },
    yAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((val)=>val.house)
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty',
        start: 0,
        end: data.length > 4 ? 4 / data.length * 100 : 100
      }
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbolSize: 5,
        connectNulls: true,
        data: data.map(val => val.house)
      }
    ]
  };
  let tmpl = `
    <div class="div-head">
      <table cellspacing=0>
        <thead>
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
              <td>${val.house}</td>
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
