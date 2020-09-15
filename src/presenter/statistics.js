import StaitsticView from "../view/statistic.js";
import StatisticRankView from "../view/statistic-rank";
import StatisticFiltersView from "../view/statistic-filters";
import StatisticContentView from "../view/statistic-content";
import StatisticChartView from "../view/statistic-chart";

import {filter} from "../utils/filter.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {setProfileRang} from "../utils/profile-rang.js";
import {statisticFilter, countDurationWatchedFilms, findTopGenre, WatchedGenre, Genre} from "../utils/statistic.js";

import {StatisticFilterType, FilterType} from "../const.js";

class Statistics {
  constructor(statisticContainer, filmsModel) {
    this._statisics = null;
    this._filmsModel = filmsModel;

    this._statisticContainer = statisticContainer;
    this._isStatisticInit = false;

    this._handlerChangePeriodOfTime = this._handlerChangePeriodOfTime.bind(this);
  }

  getStatisticInitStatus() {
    return this._isStatisticInit;
  }

  init() {
    this._films = this._filmsModel.getFilms().filter((film) => film.isWatched);
    this._watchedFilmCount = filter[FilterType.HISTORY](this._films).length;
    this._rank = setProfileRang(this._watchedFilmCount);
    this._setStatistic(StatisticFilterType.ALL);
    this._statisticComponent = new StaitsticView();
    this._statisticRankComponent = new StatisticRankView(this._rank);
    this._statisticFiltersComponent = new StatisticFiltersView(this._getStatistic(this._statisics).type);
    this._statisticChartComponent = new StatisticChartView(this._statisics);
    this._statisticFiltersComponent.setPeriodOfTimeChangeHandler(this._handlerChangePeriodOfTime);
    this._initContent();
    this._renderStatistics();
    this._isStatisticInit = true;
  }

  destroy() {
    remove(this._statisticChartComponent);
    remove(this._statisticContentComponent);
    remove(this._statisticFiltersComponent);
    remove(this._statisticRankComponent);
    remove(this._statisticComponent);
  }

  _renderStatistics() {
    render(this._statisticComponent, this._statisticRankComponent, RenderPosition.BEFOREEND);
    render(this._statisticComponent, this._statisticFiltersComponent, RenderPosition.BEFOREEND);
    render(this._statisticComponent, this._statisticContentComponent, RenderPosition.BEFOREEND);
    render(this._statisticComponent, this._statisticChartComponent, RenderPosition.BEFOREEND);
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

  _initChart() {
    this._prevStatisticChartComponent = this._statisticChartComponent;

    this._statisticChartComponent = new StatisticChartView(this._getStatistic(this._statisics));
    if (!this._prevStatisticChartComponent) {
      this._renderStatistics();
      return;
    }

    replace(this._statisticChartComponent, this._prevStatisticChartComponent);

    remove(this._prevStatisticChartComponent);
  }

  _getStatistic() {
    return this._statisics;
  }

  _setStatistic(filterType) {
    const filmsForPeriod = statisticFilter[filterType](this._films);
    const watchedGenre = {
      [`Sci-Fi`]: WatchedGenre[Genre[`Sci-Fi`]](filmsForPeriod),
      [`Animation`]: WatchedGenre[Genre[`Animation`]](filmsForPeriod),
      [`Fantasy`]: WatchedGenre[Genre[`Fantasy`]](filmsForPeriod),
      [`Comedy`]: WatchedGenre[Genre[`Comedy`]](filmsForPeriod),
      [`TV Series`]: WatchedGenre[Genre[`TV Series`]](filmsForPeriod),
      [`Adventure`]: WatchedGenre[Genre[`Adventure`]](filmsForPeriod),
      [`Family`]: WatchedGenre[Genre[`Family`]](filmsForPeriod),
      [`Action`]: WatchedGenre[Genre[`Action`]](filmsForPeriod),
      [`Drama`]: WatchedGenre[Genre[`Drama`]](filmsForPeriod),
      [`Thriller`]: WatchedGenre[Genre[`Thriller`]](filmsForPeriod)
    };
    this._statisics = {
      type: filterType,
      count: filmsForPeriod.length,
      duration: countDurationWatchedFilms(filmsForPeriod),
      genre: findTopGenre(filmsForPeriod),
      watchedGenre
    };
  }

  _handlerChangePeriodOfTime(filterType) {
    this._setStatistic(filterType);
    this._initChart();
    this._initContent();
  }
}

export default Statistics;

