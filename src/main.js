import {createUserProfileTemplate} from "./view/user-profile.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsBoardTemplate} from "./view/films-board.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createExtraFilmsListTemplate} from "./view/extra-films-list.js";
import {createAllFilmListTitleTemplate} from "./view/all-film-list-title.js";
import {createTopRatedFilmListTitleTemplate} from "./view/top-rated-film-list-title.js";
import {createMostCommentedFilmListTitleTemplate} from "./view/most-commented-film-list-title.js";
import {createNoDataTitleTemplate} from "./view/no-data-title.js";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn.js";
import {createLoadingFilmsTitleTemplate} from "./view/loading-films-title.js";
import {createFilmTemplate} from "./view/film";
import {createStatisticTemplate} from "./view/statistic.js";
import {createUserRankTemplate} from "./view/user-rank.js";
import {createStatisticFiltersTemplate} from "./view/statistic-filters.js";
import {createStatisticContentTemplate} from "./view/statistic-content.js";
import {createStatisticChart} from "./view/statistic-chart.js";
import {createFilmsCountTemplate} from "./view/films-count.js";
import {generateFilm} from "./mock/film.js";

const ALL_FILMS_COUNT = 20;
const EXTRA_FILMS_CONTAINER_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const generateFilms = () => {
  const films = [];
  for (let i = 0; i < ALL_FILMS_COUNT; i++) {
    films.push(generateFilm());
  }
  return films;
};

const allFilms = generateFilms();
console.log(allFilms);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfileTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);
render(boardElement, createFilmsListTemplate(), `beforeend`);

const allFilmsListElement = boardElement.querySelector(`.films-list`);
render(allFilmsListElement, createAllFilmListTitleTemplate(), `afterbegin`);
render(allFilmsListElement, createLoadingFilmsTitleTemplate(), `afterbegin`);
render(boardElement, createNoDataTitleTemplate(), `afterbegin`);

const allFilmsListContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

allFilms.forEach((film) => {
  render(allFilmsListContainerElement, createFilmTemplate(film), `beforeend`);
});

render(allFilmsListElement, createLoadMoreBtnTemplate(), `beforeend`);

render(boardElement, createExtraFilmsListTemplate(), `beforeend`);
render(boardElement, createExtraFilmsListTemplate(), `beforeend`);

const topRatedFilmsListElement = boardElement.querySelector(`.films-list--extra`);
const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
render(topRatedFilmsListElement, createTopRatedFilmListTitleTemplate(), `afterbegin`);

const topRatedFilms = allFilms.filter((film) => film.rating > 8);
topRatedFilms.forEach((film) => {
  render(topRatedFilmsContainerElement, createFilmTemplate(film), `beforeend`);
});

const mostCommentedFilmsListElement = boardElement.querySelector(`.films-list--extra:nth-of-type(3)`);
const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);
render(mostCommentedFilmsListElement, createMostCommentedFilmListTitleTemplate(), `afterbegin`);

const mostCommentedFilms = allFilms.filter((film) => film.comments > 3);
mostCommentedFilms.forEach((film) => {
  render(mostCommentedFilmsContainerElement, createFilmTemplate(film), `beforeend`);
});

render(siteMainElement, createStatisticTemplate(), `beforeend`);

const statisticElement = siteMainElement.querySelector(`.statistic`);
render(statisticElement, createUserRankTemplate(), `beforeend`);
render(statisticElement, createStatisticFiltersTemplate(), `beforeend`);
render(statisticElement, createStatisticContentTemplate(), `beforeend`);
render(statisticElement, createStatisticChart(), `beforeend`);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticElement, createFilmsCountTemplate(), `beforeend`);
