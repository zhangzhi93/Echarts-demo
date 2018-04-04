import * as echarts from 'echarts';
import css from '../../style/theme.less';

window.onload = function () {
  window.Data = [{
    house: '1#',
    jiedian: '节点3'
  }, {
    house: '2#',
    jiedian: '节点5'
  }, {
    house: '3#',
    jiedian: '节点1'
  }, {
    house: '4#',
    jiedian: '节点5'
  }, {
    house: '5#',
    jiedian: '节点2'
  }, {
    house: '6#',
    jiedian: '节点3'
  }, {
    house: '7#',
    jiedian: '节点4'
  }, {
    house: '8#',
    jiedian: '节点7'
  }, {
    house: '9#',
    jiedian: '节点2'
  }];
  renderPage(window.Data);
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target.nodeName == "A") {
      let index = target.getAttribute("id");
      deleteJD(index);
    }
  })
}

function renderPage(data) {
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
    grid: {
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(val => val.house)
    },
    yAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['', '节点1', '节点2', '节点3', '节点4', '节点5', '节点6', '节点7', '节点8', '节点9']
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
        data: data.map(val => val.jiedian)
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
