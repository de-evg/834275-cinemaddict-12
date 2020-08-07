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
import {createFilmPopupTemplate} from "./view/film-popup.js";
import {generateFilm} from "./mock/film.js";
import {generateProfileRang} from "./mock/user-profile.js";
import {generateFilter} from "./mock/filter.js";
import {generateStaistic} from "./mock/statistic.js";

const ALL_FILMS_COUNT = 20;
const ALL_FILMS_STEP = 5;
const EXTRA_FILMS_STEP = 2;
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

const generateFilms = () => {
  const films = [];
  for (let i = 0; i < ALL_FILMS_COUNT; i++) {
    films.push(generateFilm(i));
  }
  return films;
};

const films = generateFilms();
const allFilms = films.slice();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const profileRang = generateProfileRang();
render(siteHeaderElement, createUserProfileTemplate(profileRang), `beforeend`);

const filters = generateFilter(films);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);
render(boardElement, createFilmsListTemplate(), `beforeend`);

const allFilmsListElement = boardElement.querySelector(`.films-list`);
render(allFilmsListElement, createAllFilmListTitleTemplate(), `afterbegin`);
render(allFilmsListElement, createLoadingFilmsTitleTemplate(), `afterbegin`);

if (!films.length) {
  render(boardElement, createNoDataTitleTemplate(), `afterbegin`);
}

const allFilmsListContainerElement = allFilmsListElement.querySelector(`.films-list__container`);

allFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
  render(allFilmsListContainerElement, createFilmTemplate(film), `beforeend`);
});

render(allFilmsListElement, createLoadMoreBtnTemplate(), `beforeend`);

render(boardElement, createExtraFilmsListTemplate(), `beforeend`);
render(boardElement, createExtraFilmsListTemplate(), `beforeend`);

const topRatedFilmsListElement = boardElement.querySelector(`.films-list--extra`);
const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
render(topRatedFilmsListElement, createTopRatedFilmListTitleTemplate(), `afterbegin`);

const topRatedFilms = allFilms
  .slice()
  .filter((film) => film.rating > 8)
  .sort((a, b) => b.rating - a.rating);

topRatedFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
  render(topRatedFilmsContainerElement, createFilmTemplate(film), `beforeend`);
});

const mostCommentedFilmsListElement = boardElement.querySelector(`.films-list--extra:nth-of-type(3)`);
const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);
render(mostCommentedFilmsListElement, createMostCommentedFilmListTitleTemplate(), `afterbegin`);

const mostCommentedFilms = allFilms
  .slice()
  .filter((film) => film.comments > 3)
  .sort((a, b) => b.comments - a.comments);

mostCommentedFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
  render(mostCommentedFilmsContainerElement, createFilmTemplate(film), `beforeend`);
});

render(siteMainElement, createStatisticTemplate(), `beforeend`);

const statisticElement = siteMainElement.querySelector(`.statistic`);
const statistic = generateStaistic(films);
render(statisticElement, createUserRankTemplate(statistic), `beforeend`);
render(statisticElement, createStatisticFiltersTemplate(), `beforeend`);
render(statisticElement, createStatisticContentTemplate(statistic), `beforeend`);
render(statisticElement, createStatisticChart(), `beforeend`);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticElement, createFilmsCountTemplate(), `beforeend`);

const onFilmClick = (evt) => {  
  const index = films.findIndex((film) => film.id === evt.target.id);
  render(siteBodyElement, createFilmPopupTemplate(films[index]), `beforeend`);
  const popupElement = siteBodyElement.querySelector(`.film-details`);
  const popupCloseElement = popupElement.querySelector(`.film-details__close-btn`);
  popupCloseElement.addEventListener(`click`, (evtClose) => {
    evtClose.preventDefault();
    popupElement.remove();
  });
};
boardElement.addEventListener(`click`, onFilmClick);
