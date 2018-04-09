import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import css from '../../style/theme.less';

window.onload = function () {
  window.Data = [{
    house: '1#',
    date: '2018-02-12',
  }, {
    house: '2#',
    date: '2018-03-02',
  }, {
    house: '3#',
    date: '2018-05-20',
  }, {
    house: '4#',
    date: '2018-01-18',
  }, {
    house: '5#',
    date: '2018-01-11',
  }, {
    house: '6#',
    date: '2018-02-02',
  }, {
    house: '7#',
    date: '2018-05-10',
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
  const option = {
    backgroundColor: '#FEFAF4',
    tooltip: {
      formatter: '{a} <br/> {b}：{c}'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(h => h.house)
    },
    yAxis: {
      type: 'time',
      min: new Date('2018-01-01'),
      max: new Date('2018-06-30'),
      boundaryGap: false,
      axisLabel: {
        formatter: function (value, index) {
          var date = new Date(value);
          var texts = [(date.getMonth() + 1), date.getDate()];
          if (index === 0) {
            texts.unshift(date.getYear());
          }
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
        name: '节点名称',
        type: 'line',
        data: data.map(h => h.date),
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
                <td>${val.house}</td>
                <td>${val.date}</td>
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
