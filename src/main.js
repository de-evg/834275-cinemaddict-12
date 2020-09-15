import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import CommentModel from "./model/comments.js";

import MovieListPresenter from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticPresenter from "./presenter/statistics.js";
import FilmsCountPresenter from "./presenter/films-count.js";
import ProfileRangPresenter from "./presenter/profile-rang.js";

import {UpdateType, Socket, FilterType} from "./const.js";

import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(Socket.END_POINT, Socket.AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const filmsModel = new FilmsModel();

let statisticIsHidden = true;
const switchToFilms = () => {
  if (statisticIsHidden) {
    return;
  }

  statisticPresenter.destroy();
  movieListPresenter.init();

  statisticIsHidden = true;
};

const switchToStatstic = () => {
  if (!statisticIsHidden) {
    return;
  }

  movieListPresenter.destroy();
  statisticPresenter.init();

  statisticIsHidden = false;
};

const handleSiteMenuClick = () => {
  const filterType = filterModel.getFilter();
  switch (filterType) {
    case (FilterType.STATS):
      switchToStatstic();
      break;
    default:
      switchToFilms();
  }
};

const profileRangPresenter = new ProfileRangPresenter(siteHeaderElement, filmsModel);
profileRangPresenter.init();

const filterModel = new FilterModel();

const commentModel = new CommentModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, handleSiteMenuClick);
filterPresenter.init();
filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);

const movieListPresenter = new MovieListPresenter(siteMainElement, filmsModel, filterModel, commentModel, apiWithProvider);
movieListPresenter.init();

const statisticPresenter = new StatisticPresenter(siteMainElement, filmsModel);

const filmsCountPresenter = new FilmsCountPresenter(footerStatisticsElement, filmsModel);
filmsCountPresenter.init();

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
