import {createElement} from "../utils";

class StatisticChart {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="statistic__chart-wrap">
              <canvas class="statistic__chart" width="1000"></canvas>
            </div>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default StatisticChart;
