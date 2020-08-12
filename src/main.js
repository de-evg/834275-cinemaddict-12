import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import BoardView from "./view/board.js";
import FilmListView from "./view/films-list.js";
import ExtraFilmsListView from "./view/extra-films-list.js";
import AllFilmsListTitleView from "./view/all-film-list-title.js";
import TopRatedListTitleView from "./view/top-rated-list-title.js";
import MostCommentedListTitleView from "./view/most-commented-list-title.js";
import {createNoDataTitleTemplate} from "./view/no-data-title.js";
import LoadMoreBtnView from "./view/load-more-btn.js";
import LoadingFilmsView from "./view/loading-films.js";
import FilmView from "./view/film";
import StatisticView from "./view/statistic.js";
import UserRankView from "./view/user-rank.js";
import StatisticFiltersView from "./view/statistic-filters.js";
import StaticticContentView from "./view/statistic-content.js";
import StatisticChartView from "./view/statistic-chart.js";
import FilmsCountView from "./view/films-count.js";
import FilmPopupView from "./view/film-popup.js";
import {generateFilm} from "./mock/film.js";
import {generateProfileRang} from "./mock/user-profile.js";
import {generateFilter} from "./mock/filter.js";
import {generateStaistic} from "./mock/statistic.js";
import {render, RenderPosition} from "./utils.js";

const ALL_FILMS_COUNT = 23;
const ALL_FILMS_STEP = 5;
const EXTRA_FILMS_STEP = 2;
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

const films = new Array(ALL_FILMS_COUNT).fill().map(generateFilm);
const allFilms = films.slice();

const profileRang = generateProfileRang();
render(siteHeaderElement, new UserProfileView(profileRang).getElement(), RenderPosition.BEFOREEND);

const filters = generateFilter(films);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const allFilmsListComponent = new FilmListView();
render(boardComponent.getElement(), allFilmsListComponent.getElement(), RenderPosition.BEFOREEND);

render(allFilmsListComponent.getElement(), new AllFilmsListTitleView().getElement(), RenderPosition.AFTERBEGIN);
render(allFilmsListComponent.getElement(), new LoadingFilmsView().getElelment(), RenderPosition.AFTERBEGIN);

if (!films.length) {
  render(boardComponent.getElelment(), createNoDataTitleTemplate(), RenderPosition.AFTERBEGIN);
}
const allFilmsListContainerElement = allFilmsListComponent.getElement().querySelector(`.films-list__container`);
allFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
  render(allFilmsListContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND);
});

const loadMoreBtnComponent = new LoadMoreBtnView();
render(allFilmsListComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();
  allFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
    render(allFilmsListContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND);
  });
  if (!allFilms.length) {
    loadMoreBtnComponent.getElement().remove();
    loadMoreBtnComponent.removeElement();
  }
});

const topRatedFilmsListComponent = new ExtraFilmsListView();
render(boardComponent.getElement(), topRatedFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
render(topRatedFilmsListComponent.getElement(), new TopRatedListTitleView().getElement(), RenderPosition.AFTERBEGIN);

const topRatedFilms = allFilms
  .slice()
  .filter((film) => film.rating > 8)
  .sort((a, b) => b.rating - a.rating);

if (topRatedFilms.length) {
  const topRatedFilmsContainerElement = topRatedFilmsListComponent.getElement().querySelector(`.films-list__container`);
  topRatedFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
    render(topRatedFilmsContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND);
  });
}


const mostCommentedFilmsListComponent = new ExtraFilmsListView();
render(boardComponent.getElement(), mostCommentedFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
render(mostCommentedFilmsListComponent.getElement(), new MostCommentedListTitleView().getElement(), RenderPosition.AFTERBEGIN);

const mostCommentedFilms = allFilms
  .slice()
  .filter((film) => film.comments.length > 0)
  .sort((a, b) => b.comments.length - a.comments.length);

if (mostCommentedFilms.length) {
  const mostCommentedFilmsContainerElement = mostCommentedFilmsListComponent.getElement().querySelector(`.films-list__container`);
  mostCommentedFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
    render(mostCommentedFilmsContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND);
  });
}

const statisticComponent = new StatisticView();
render(siteMainElement, statisticComponent.getElement(), RenderPosition.BEFOREEND);

const statistic = generateStaistic(films);
render(statisticComponent.getElement(), new UserRankView(statistic.rank).getElement(), RenderPosition.BEFOREEND);
render(statisticComponent.getElement(), new StatisticFiltersView().getElement(), RenderPosition.BEFOREEND);
render(statisticComponent.getElement(), new StaticticContentView(statistic).getElement(), RenderPosition.BEFOREEND);
render(statisticComponent.getElement(), new StatisticChartView().getElement(), RenderPosition.BEFOREEND);

render(footerStatisticElement, new FilmsCountView(films.length).getElement(), RenderPosition.BEFOREEND);

const filmPopupComponent = new FilmPopupView(films[0]);
render(siteBodyElement, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
const popupCloseElement = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);
popupCloseElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  filmPopupComponent.getElement().remove();
  filmPopupComponent.removeElement();
});
