import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BAR_HEIGHT = 50;

class StatisticChart extends SmartView {
  constructor(statistic) {
    super();
    this._watchedGenre = statistic.watchedGenre;
    this._statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._statisticCtx.height = BAR_HEIGHT * Object.keys(this._watchedGenre).length;
    this._createChart();
  }

  getTemplate() {
    return `<div class="statistic__chart-wrap">
              <canvas class="statistic__chart" width="1000">
                ${this._myChart}
              </canvas>
            </div>`;
  }

  _createChart() {
    this._myChart = new Chart(this._statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(this._watchedGenre)],
        datasets: [{
          data: [...Object.values(this._watchedGenre)],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      },
      datasets: [{
        barThickness: 24
      }],
    });
  }
}

export default StatisticChart;
