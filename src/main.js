import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import CommentModel from "./model/comments.js";

import SiteMenuView from "./view/site-menu.js";
import UserProfileView from "./view/user-profile.js";
import FilmsCountView from "./view/films-count.js";

import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticPresenter from "./presenter/statistics.js";

import {generateProfileRang} from "./mock/user-profile.js";
import {render, RenderPosition} from "./utils/render.js";

import {MenuItem, UpdateType} from "./const.js";

import Api from "./api.js";

const AUTHORIZATION = `Basic aS2dfgSfer3fbrb3fw`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

const filmsModel = new FilmsModel();
const api = new Api(END_POINT, AUTHORIZATION);
api.getFilms()
.then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
})
.catch(() => {
  filmsModel.setFilms(UpdateType.INIT, []);
});

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

const profileRang = generateProfileRang();
render(siteHeaderElement, new UserProfileView(profileRang), RenderPosition.BEFOREEND);

const filterModel = new FilterModel();

const commentModel = new CommentModel();

const filterPresenter = new FilterPresenter(siteMenuComponent, filterModel, filmsModel, handleSiteMenuClick);
filterPresenter.init();

const movieListPresenter = new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentModel);
const statisticPresenter = new StatisticPresenter(siteMainElement, filmsModel.getFilms());
movieListPresenter.init();

render(footerStatisticElement, new FilmsCountView(filmsModel.getFilms().length, RenderPosition.BEFOREEND));
