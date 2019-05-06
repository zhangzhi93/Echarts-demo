import echarts from 'echarts/lib/echarts';
import axios from 'axios';
import util from '../../js/util';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import '../../style/theme.less';

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
  let option;
  if (sign == "1") {
    option = {
      title: {
        text: window.buildname,
        top: 10,
        left: 'center'
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
  } else {
    option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: 80,
        bottom: 20,
      },
      //legend: {
      //  type: 'scroll',
      //  top: 10,
      //  data: data.map(val => val.buildname)
      //},
      xAxis: {
        type: 'category',
        data: data[0].collect.map(h => `${h.node1}-${h.node2}`)
      },
      yAxis: {
        type: 'value',
        max: val => val.max + 2,
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
      series: data.map(val => {
        return {
          type: 'line',
          data: val.collect.map(d => parseInt(d.days)),
          name: val.buildname,
        }
      })
    };
  }
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
    //---2019-05-05 add
    let moreTmpl = `
      <div class="scroll-table">
        <table cellspacing=0>
          <thead>
            <tr>
              <th>楼栋</th>
              ${data[0].collect.map((d, i) => `
              <th>
                <div style="width:100px">${d.node1}</div>
                <div style="width:100px">${d.node2}</div>
              </th>`).join('')}
              <th>合计</th>
              <th>平均工期</th>
            </tr>
          </thead>
          <tbody class="col-4">
          ${data.map((val, n) => `
            <tr>
              <td>${val.stoname}</td>
              ${val.collect.map((d, i) => `
              <td>${d.days}</td>
              `).join('')}
              <td>${val.heji}</td>
              <td>${val.pingjun}</td>
            </tr>
          `).join('')}
          </tbody>
        </table>
      </div>`;
    tableDom.innerHTML = moreTmpl;
    myChart.setOption(option, true);
  }
}

function deleteJD(i) {
  window.Data.splice(i, 1);
  renderPage(window.Data);
}

function averageValue(arr) {
  let value = 0;
  arr.forEach((val, index) => {
    value += parseInt(Math.abs(val.days));
  })
  return (value / arr.length).toFixed(2);
}
