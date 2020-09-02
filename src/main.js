import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import CommentModel from "./model/comments.js";

import SiteMenuView from "./view/site-menu.js";

import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticPresenter from "./presenter/statistics.js";
import FilmsCountPresenter from "./presenter/films-count.js";
import ProfileRangPresenter from "./presenter/profile-rang.js";

import {render, RenderPosition} from "./utils/render.js";

import {MenuItem, UpdateType, Socket} from "./const.js";

import Api from "./api.js";

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const filmsModel = new FilmsModel();

const handleSiteMenuClick = (menuItem) => {
  siteMenuComponent.setActiveMenuItem(menuItem);
  switch (menuItem) {
    case (MenuItem.STATISTIC):
      filterPresenter.setCurrentFilterDisabled();
      movieListPresenter.destroy();
      statisticPresenter.init();
      break;
    default:
      if (statisticPresenter.getStatisticInitStatus()) {
        statisticPresenter.destroy();
      }
  }
};

const siteMenuComponent = new SiteMenuView(MenuItem.ALL);
siteMenuComponent.setMenuTypeChangeHandler(handleSiteMenuClick);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const profileRangPresenter = new ProfileRangPresenter(siteHeaderElement, filmsModel);
profileRangPresenter.init();

const filterModel = new FilterModel();

const commentModel = new CommentModel();

const filterPresenter = new FilterPresenter(siteMenuComponent, filterModel, filmsModel, handleSiteMenuClick);
filterPresenter.init();

const movieListPresenter = new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentModel);
const statisticPresenter = new StatisticPresenter(siteMainElement, filmsModel);
movieListPresenter.init();

const filmsCountPresenter = new FilmsCountPresenter(footerStatisticsElement, filmsModel);
filmsCountPresenter.init();

const api = new Api(Socket.END_POINT, Socket.AUTHORIZATION);
api.getFilms()
.then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
})
.catch(() => {
  filmsModel.setFilms(UpdateType.INIT, []);
});
