import * as echarts from 'echarts';
import css from '../../style/theme.less';

window.onload = function () {
  const dom = document.getElementById("main");
  const myChart = echarts.init(dom);
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
        label:{
          show:false
        },
        data: [
          { value: 10, name: '节点A-节点B' },
          { value: 5, name: '节点B-节点C' },
          { value: 13, name: '节点D-节点E' },
          { value: 6, name: '节点C-节点D' },
          { value: 9, name: '节点F-节点E' }
        ],
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

  myChart.setOption(option, true);

  const tableDom = document.getElementById('table_container');
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
        <tbody>
          ${Data.map(val => `
            <tr>
              <td>${val.house}</td>
              <td>${val.kg}</td>
              <td>删除</td>
            </tr>
          </tbody>`).join('')}
      </table>
    </div>`;
  tableDom.innerHTML = tmpl;
}
