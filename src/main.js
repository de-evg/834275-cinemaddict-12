import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import CommentModel from "./model/comments.js";

import SiteMenuView from "./view/site-menu.js"
import UserProfileView from "./view/user-profile.js";
import StatisticView from "./view/statistic.js";
import UserRankView from "./view/user-rank.js";
import StatisticFiltersView from "./view/statistic-filters.js";
import StaticticContentView from "./view/statistic-content.js";
import StatisticChartView from "./view/statistic-chart.js";
import FilmsCountView from "./view/films-count.js";

import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";

import {generateFilm} from "./mock/film.js";
import {generateProfileRang} from "./mock/user-profile.js";
import {generateStaistic} from "./mock/statistic.js";
import {render, RenderPosition, remove} from "./utils/render.js";

import {MenuItem, FilterType, UpdateType} from "./const.js";

const ALL_FILMS_COUNT = 23;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

const films = new Array(ALL_FILMS_COUNT).fill().map(generateFilm);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

let statisticComponent = null;
const handleSiteMenuClick = (menuItem) => {
  siteMenuComponent.setActiveMenuItem(menuItem);
  switch (menuItem) {
    case MenuItem.All:
      if (statisticComponent) {
        remove(statisticComponent);
      }
      break;
    case (MenuItem.WATCHLIST):
      if (statisticComponent) {
        remove(statisticComponent);
      }
      break;
    case (MenuItem.HISTORY):
      if (statisticComponent) {

        remove(statisticComponent);
      }
      break;
    case (MenuItem.FAVORITES):
      if (statisticComponent) {
        remove(statisticComponent);
      }
      break;
    case (MenuItem.STATISTIC):
      movieListPresenter.destroy();
      statisticComponent = new StatisticView();
      render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);
      const statistic = generateStaistic(filmsModel.getFilms());
      render(statisticComponent, new UserRankView(statistic.rank), RenderPosition.BEFOREEND);
      render(statisticComponent, new StatisticFiltersView(), RenderPosition.BEFOREEND);
      render(statisticComponent, new StaticticContentView(statistic), RenderPosition.BEFOREEND);
      render(statisticComponent, new StatisticChartView(), RenderPosition.BEFOREEND);
      break;
  }
};

const siteMenuComponent = new SiteMenuView(MenuItem.ALL);
siteMenuComponent.setMenuTypeChangeHandler(handleSiteMenuClick);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const profileRang = generateProfileRang();
render(siteHeaderElement, new UserProfileView(profileRang), RenderPosition.BEFOREEND);

const filterModel = new FilterModel();

const commentModel = new CommentModel();

const filterPresenter = new FilterPresenter(siteMenuComponent, filterModel, filmsModel, handleSiteMenuClick);
filterPresenter.init();

const movieListPresenter = new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentModel);
movieListPresenter.init();

render(footerStatisticElement, new FilmsCountView(films.length), RenderPosition.BEFOREEND);
