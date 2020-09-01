import StaitsticView from "../view/statistic.js";
import StatisticRankView from "../view/statistic-rank";
import StatisticFiltersView from "../view/statistic-filters";
import StatisticContentView from "../view/statistic-content";
import StatisticChartView from "../view/statistic-chart";

import {statisticFilter, countDurationWatchedFilms, findTopGenre} from "../utils/statistic.js";

import {StatisticFilterType} from "../const.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {getRandomInteger} from "../utils/common.js";

const userRanks = [
  `Sci-Fighter`, `Sci-Defender`, `Sci-Finder`, `Sci-Minder`
];

class Staitstics {
  constructor(statisticContainer, films) {
    this._statisics = null;
    this._films = films.slice();
    this._statisticContainer = statisticContainer;
    this._isStatisticInit = false;
    
    this._handelerChangePeriod = this._handelerChangePeriod.bind(this);
    this._setStatistic(StatisticFilterType.ALL);
  }

  getStatisticInitStatus() {
    return this._isStatisticInit;
  }

  init() {
    this._statisticComponent = new StaitsticView();
    this._statisticRankComponent = new StatisticRankView(userRanks[getRandomInteger(0, userRanks.length - 1)]);
    this._statisticFiltersComponent = new StatisticFiltersView(this._getStatistic(this._statisics).type);
    this._statisticChartView = new StatisticChartView();
    this._statisticFiltersComponent.setPeriodChandeHandler(this._handelerChangePeriod);
    this._initContent();
    this._renderStatistics();
    this._isStatisticInit = true;
  }

  destroy() {
    remove(this._statisticChartView);
    remove(this._statisticContentComponent);
    remove(this._statisticFiltersComponent);
    remove(this._statisticRankComponent);
    remove(this._statisticComponent);
  }

  _renderStatistics() {
    render(this._statisticComponent, this._statisticRankComponent, RenderPosition.BEFOREEND);
    render(this._statisticComponent, this._statisticFiltersComponent, RenderPosition.BEFOREEND);
    render(this._statisticComponent, this._statisticContentComponent, RenderPosition.BEFOREEND);
    render(this._statisticComponent, this._statisticChartView, RenderPosition.BEFOREEND);
    render(this._statisticContainer, this._statisticComponent, RenderPosition.BEFOREEND);
  }

  _initContent() {
    this._prevStatisticContentComponent = this._statisticContentComponent;

    this._statisticContentComponent = new StatisticContentView(this._getStatistic(this._statisics));
    if (!this._prevStatisticContentComponent) {
      this._renderStatistics();
      return;
    }

    replace(this._statisticContentComponent, this._prevStatisticContentComponent);

    remove(this._prevStatisticContentComponent);
  }

  _getStatistic() {
    return this._statisics;
  }

  _setStatistic(filterType) {
    const statistics = statisticFilter[filterType](this._films.slice());
    this._statisics = {
      type: filterType,
      count: statistics.length,
      duration: countDurationWatchedFilms(statistics),
      genre: findTopGenre(statistics)
    };
  }

  _handelerChangePeriod(filterType) {
    this._setStatistic(filterType);
    this._initContent();
  }
}

export default Staitstics;

