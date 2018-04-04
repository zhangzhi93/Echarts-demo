import * as echarts from 'echarts';
import css from '../../style/theme.less';

window.onload = function () {
  window.Data = [{
    node1: '节点1',
    node2: '节点2',
    date1: '2018年2月23日',
    date2: '2018年2月28日',
    days: 5,
  }, {
    node1: '节点2',
    node2: '节点3',
    date1: '2018年2月28日',
    date2: '2018年2月24日',
    days: 4,
  }, {
    node1: '节点3',
    node2: '节点4',
    date1: '2018年2月24日',
    date2: '2018年2月26日',
    days: 2,
  }, {
    node1: '节点4',
    node2: '节点5',
    date1: '2018年2月26日',
    date2: '2018年2月19日',
    days: 7,
  }, {
    node1: '节点5',
    node2: '节点6',
    date1: '2018年2月19日',
    date2: '2018年2月28日',
    days: 9,
  }];
  renderPage(window.Data);
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
    title: {
      text: '节点信息',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
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
          <th>操作</th>
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
              <td>删除</td>
            </tr>
            <tr>
              <td>${val.node2}</td>
              <td>${val.date2}</td>
              <td>删除</td>
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
