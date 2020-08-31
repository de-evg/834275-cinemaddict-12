import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import CommentModel from "./model/comments.js";

import UserProfileView from "./view/user-profile.js";
import StatisticView from "./view/statistic.js";
import UserRankView from "./view/user-rank.js";
import StatisticFiltersView from "./view/statistic-filters.js";
import StaticticContentView from "./view/statistic-content.js";
import StatisticChartView from "./view/statistic-chart.js";
import FilmsCountView from "./view/films-count.js";

import FilmListPresenter from "./presenter/filmList.js";
import FilterPresenter from "./presenter/filter.js";

import {generateFilm} from "./mock/film.js";
import {generateProfileRang} from "./mock/user-profile.js";
import {generateStaistic} from "./mock/statistic.js";
import {render, RenderPosition} from "./utils/render.js";

const ALL_FILMS_COUNT = 23;

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

const films = new Array(ALL_FILMS_COUNT).fill().map(generateFilm);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const profileRang = generateProfileRang();
render(siteHeaderElement, new UserProfileView(profileRang), RenderPosition.BEFOREEND);

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

const commentModel = new CommentModel();

const mainFilmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentModel);
mainFilmListPresenter.init();

const statisticComponent = new StatisticView();
render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);

const statistic = generateStaistic(films);
render(statisticComponent, new UserRankView(statistic.rank), RenderPosition.BEFOREEND);
render(statisticComponent, new StatisticFiltersView(), RenderPosition.BEFOREEND);
render(statisticComponent, new StaticticContentView(statistic), RenderPosition.BEFOREEND);
render(statisticComponent, new StatisticChartView(), RenderPosition.BEFOREEND);

render(footerStatisticElement, new FilmsCountView(films.length), RenderPosition.BEFOREEND);
