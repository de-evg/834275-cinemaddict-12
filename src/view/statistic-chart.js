import AbstractView from "./abstract.js";

class StatisticChart extends AbstractView {
  getTemplate() {
    return `<div class="statistic__chart-wrap">
              <canvas class="statistic__chart" width="1000"></canvas>
            </div>`;
  }
}

export default StatisticChart;
