import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import BoardView from "./view/board.js";
import FilmListView from "./view/films-list.js";
import {createExtraFilmsListTemplate} from "./view/extra-films-list.js";
import AllFilmsListTitleView from "./view/all-film-list-title.js";
import {createTopRatedFilmListTitleTemplate} from "./view/top-rated-film-list-title.js";
import {createMostCommentedFilmListTitleTemplate} from "./view/most-commented-film-list-title.js";
import {createNoDataTitleTemplate} from "./view/no-data-title.js";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn.js";
import LoadingFilmsView from "./view/loading-films.js";
import FilmView from "./view/film";
import {createStatisticTemplate} from "./view/statistic.js";
import {createUserRankTemplate} from "./view/user-rank.js";
import {createStatisticFiltersTemplate} from "./view/statistic-filters.js";
import {createStatisticContentTemplate} from "./view/statistic-content.js";
import {createStatisticChart} from "./view/statistic-chart.js";
import {createFilmsCountTemplate} from "./view/films-count.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";
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
  render(boardElement, createNoDataTitleTemplate(), RenderPosition.AFTERBEGIN);
}
const allFilmsListContainerElement = allFilmsListComponent.getElement().querySelector(`.films-list__container`);
allFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
  render(allFilmsListContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND);
});

render(allFilmsListComponent.getElement(), createLoadMoreBtnTemplate(), RenderPosition.BEFOREEND);

const loadMoreBtnElement = allFilmsListElement.querySelector(`.films-list__show-more`);
loadMoreBtnElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  allFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
    render(allFilmsListContainerElement, createFilmTemplate(film), RenderPosition.BEFOREEND);
  });
  if (!allFilms.length) {
    loadMoreBtnElement.remove();
  }
});

render(boardElement, createExtraFilmsListTemplate(), RenderPosition.BEFOREEND);
render(boardElement, createExtraFilmsListTemplate(), RenderPosition.BEFOREEND);

const topRatedFilmsListElement = boardElement.querySelector(`.films-list--extra`);
const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
render(topRatedFilmsListElement, createTopRatedFilmListTitleTemplate(), RenderPosition.AFTERBEGIN);

const topRatedFilms = allFilms
  .slice()
  .filter((film) => film.rating > 8)
  .sort((a, b) => b.rating - a.rating);

if (topRatedFilms) {
  topRatedFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
    render(topRatedFilmsContainerElement, createFilmTemplate(film), RenderPosition.BEFOREEND);
  });
}

const mostCommentedFilmsListElement = boardElement.querySelector(`.films-list--extra:nth-of-type(3)`);
const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);
render(mostCommentedFilmsListElement, createMostCommentedFilmListTitleTemplate(), RenderPosition.AFTERBEGIN);

const mostCommentedFilms = allFilms
  .slice()
  .filter((film) => film.comments.length > 0)
  .sort((a, b) => b.comments.length - a.comments.length);

if (mostCommentedFilms.length) {
  mostCommentedFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
    render(mostCommentedFilmsContainerElement, createFilmTemplate(film), RenderPosition.BEFOREEND);
  });
}

render(siteMainElement, createStatisticTemplate(), RenderPosition.BEFOREEND);

const statisticElement = siteMainElement.querySelector(`.statistic`);
const statistic = generateStaistic(films);
render(statisticElement, createUserRankTemplate(statistic), RenderPosition.BEFOREEND);
render(statisticElement, createStatisticFiltersTemplate(), RenderPosition.BEFOREEND);
render(statisticElement, createStatisticContentTemplate(statistic), RenderPosition.BEFOREEND);
render(statisticElement, createStatisticChart(), RenderPosition.BEFOREEND);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticElement, createFilmsCountTemplate(films), RenderPosition.BEFOREEND);

render(siteBodyElement, createFilmPopupTemplate(films[0]), RenderPosition.BEFOREEND);
const popupElement = siteBodyElement.querySelector(`.film-details`);
const popupCloseElement = popupElement.querySelector(`.film-details__close-btn`);
popupCloseElement.addEventListener(`click`, (evtClose) => {
  evtClose.preventDefault();
  popupElement.remove();
});
