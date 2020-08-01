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
import {createCardTemplate} from "./view/card";
import {createStatisticTemplate} from "./view/statistic.js";
import {createUserRankTemplate} from "./view/user-rank.js";
import {createStatisticFiltersTemplate} from "./view/statistic-filters.js";
import {createStatisticContentTemplate} from "./view/statistic-content.js";
import {createStatisticChart} from "./view/statistic-chart.js";
import {createFilmsCountTemplate} from "./view/films-count.js";
const ALL_FILMS_COUNT = 5;
const EXTRA_FILMS_CONTAINER_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

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

const multipleRenderElements = (container, template, place, count) => {
  for (let i = 0; i < count; i++) {
    render(container, template, place);
  }
};

multipleRenderElements(allFilmsListContainerElement, createCardTemplate(), `beforeend`, ALL_FILMS_COUNT);
render(allFilmsListElement, createLoadMoreBtnTemplate(), `beforeend`);

multipleRenderElements(boardElement, createExtraFilmsListTemplate(), `beforeend`, EXTRA_FILMS_CONTAINER_COUNT);

const topRatedFilmsListElement = boardElement.querySelector(`.films-list--extra`);
const topRatedFilmsContainerElement = topRatedFilmsListElement.querySelector(`.films-list__container`);
render(topRatedFilmsListElement, createTopRatedFilmListTitleTemplate(), `afterbegin`);

multipleRenderElements(topRatedFilmsContainerElement, createCardTemplate(), `beforeend`, EXTRA_FILMS_COUNT);

const mostCommentedFilmsListElement = boardElement.querySelector(`.films-list--extra:nth-of-type(3)`);
const mostCommentedFilmsContainerElement = mostCommentedFilmsListElement.querySelector(`.films-list__container`);
render(mostCommentedFilmsListElement, createMostCommentedFilmListTitleTemplate(), `afterbegin`);

multipleRenderElements(mostCommentedFilmsContainerElement, createCardTemplate(), `beforeend`, EXTRA_FILMS_COUNT);

render(siteMainElement, createStatisticTemplate(), `beforeend`);

const statisticElement = siteMainElement.querySelector(`.statistic`);
render(statisticElement, createUserRankTemplate(), `beforeend`);
render(statisticElement, createStatisticFiltersTemplate(), `beforeend`);
render(statisticElement, createStatisticContentTemplate(), `beforeend`);
render(statisticElement, createStatisticChart(), `beforeend`);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticElement, createFilmsCountTemplate(), `beforeend`);
