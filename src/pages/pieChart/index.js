import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import css from '../../style/theme.less';

window.onload = function () {
  const nodes = util.getParaValueByName('nodes');
  const buildid = util.getParaValueByName('buildid');
  const cs = util.getParaValueByName('c_s');
  axios.get(`${util.Base.contextPath}yh_manynode_show_1_0${util.Base.endPath}`, {
    params: {
      nodes: nodes,
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
          renderPage(data.collect);
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
  const tableDom = document.getElementById('table_container');
  const myChart = echarts.init(dom);
  let pieData = [];
  data.forEach(element => {
    let obj = {
      value: 0,
      name: ''
    }
    obj.value = element.days;
    obj.name = `${element.node1}-${element.node2}`;
    pieData.push(obj);
  });
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        label: {
          show: false
        },
        data: pieData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  let tmpl = `
    <div class="div-head">
      <table cellspacing=0>
        <thead>
          <th>节点</th>
          <th>日期</th>
          <th>时长</th>
        </thead>
      </table>
    </div>
    <div class="div-body">
      <table cellspacing=0>
        <tbody class="col-4">
          ${data.map(val => `
            <tr>
              <td>${val.node1}</td>
              <td>${val.date1}</td>
              <td rowspan="2">${val.days}</td>
            </tr>
            <tr>
              <td>${val.node2}</td>
              <td>${val.date2}</td>
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
