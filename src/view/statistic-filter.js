import AbstractView from "./abstract.js";
import {StatisticFilterType} from "../const.js";

class StatisticFilter extends AbstractView {
  constructor(activeFilter) {
    super();
    this._activeFilter = activeFilter;
    this._handleStatisticFilterChange = this._handleStatisticFilterChange.bind(this);
  }
  getTemplate() {
    return `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
              <p class="statistic__filters-description">Show stats:</p>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this._activeFilter === StatisticFilterType.ALL ? `checked` : ``}>
              <label for="statistic-all-time" class="statistic__filters-label">All time</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._activeFilter === StatisticFilterType.TODAY ? `checked` : ``}>
              <label for="statistic-today" class="statistic__filters-label">Today</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._activeFilter === StatisticFilterType.WEEK ? `checked` : ``}>
              <label for="statistic-week" class="statistic__filters-label">Week</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._activeFilter === StatisticFilterType.MONTH ? `checked` : ``}>
              <label for="statistic-month" class="statistic__filters-label">Month</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._activeFilter === StatisticFilterType.YEAR ? `checked` : ``}>
              <label for="statistic-year" class="statistic__filters-label">Year</label>
            </form>`;
  }

  setStatisticFilterChangeHandler(callback) {
    this._callback.change = callback;
    this.getElement().addEventListener(`change`, this._handleStatisticFilterChange);
  }

  _handleStatisticFilterChange(evt) {
    evt.preventDefault();
    this._callback.change(evt.target.value);
  }
}

export default StatisticFilter;
