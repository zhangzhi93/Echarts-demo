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
  let Type = "1";
  if (buildid.split(',').length > 1) {
    Type = "2";
  }
  axios.get(`${util.Base.contextPath}yh_manynode_show_1_0${util.Base.endPath}`, {
    params: {
      nodes: nodes,
      buildid: buildid,
      type: Type
    }
  })
    .then(function (res) {
      const data = res.data;
      if (data.result == 0) {
        if (Type == "1" && data.collect.length == 0) {
          util.Alert(cs, '没有查询到相关记录');
        } else if (Type == "2" && data.collects.length == 0) {
          util.Alert(cs, '没有查询到相关记录');
        } else {
          if (Type == "1") {
            window.Data = data.collect;
            window.buildname = data.buildname;
            renderPage(data.collect, "1");
          } else {
            renderPage(data.collects, "2");
          }
        }
      } else {
        util.Alert(cs, data.message);
      }
    })
    .catch(function (error) {
      util.Alert(cs, error);
    });
}

function renderPage(data, sign) {
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
    title: {
      text: window.buildname,
      top:10,
      left:'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
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
  if (sign === "1") {
    let oneTmpl = `
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
              </tr>`).join('')}
            </tbody>
        </table>
      </div>`;
    myChart.setOption(option, true);
    tableDom.innerHTML = oneTmpl;
  } else {
    let moreTmpl = `
      ${data.map(val => `
        <table cellspacing=0 style="margin-top:10px;border: 1px solid #e3e3e3;">
          <thead>
            <th colspan="3">${val.buildname}</th>
          </thead>
          <tbody class="col-4">
            <tr>
              <td>节点</td>
              <td>日期</td>
              <td>时长</td>
            </tr>
          ${val.collect.map(d => `
            <tr>
              <td>${d.node1}</td>
              <td>${d.date1}</td>
              <td rowspan="2">${d.days}</td>
            </tr>
            <tr>
              <td>${d.node2}</td>
              <td>${d.date2}</td>
            </tr>`).join('')}
          </tbody>
        </table>`).join('')}`;
    dom.style.display = "none";
    tableDom.innerHTML = moreTmpl;
  }
}

function deleteJD(i) {
  window.Data.splice(i, 1);
  renderPage(window.Data);
}
