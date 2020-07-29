'use strict';

const ALL_FILMS_COUNT = 5;
const EXTRA_FILMS_CONTAINER_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createUserProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
            <p class="profile__rating">Movie Buff</p>
            <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        </section>`
  );
};

const createFilterTemplate = () => {
  return (
    `<nav class="main-navigation">
            <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
                <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
                <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
                <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>`
  );
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
            <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
            <li><a href="#" class="sort__button">Sort by date</a></li>
            <li><a href="#" class="sort__button">Sort by rating</a></li>
        </ul>`
  );
};

const createFilmsBoardTemplate = () => {
  return (
    `<section class="films">
        </section>`
  );
};

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">              
            <div class="films-list__container"></div>            
        </section>`
  );
};

const createExtraFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">              
            <div class="films-list__container"></div>            
        </section>`
  );
};

const createAllFilmListTitleTemplate = () => {
  return (
    `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
  );
};

const createTopRatedFilmListTitleTemplate = () => {
  return (
    `<h2 class="films-list__title">Top rated</h2>`
  );
};

const createMostCommentedFilmListTitleTemplate = () => {
  return (
    `<h2 class="films-list__title">Most commented</h2>`
  );
};

const createNoDataTitleTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

const createLoadMoreBtnTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createLoadingFilmsTitleTemplate = () => {
  return (
    `<h2 class="films-list__title">Loading...</h2>`
  );
};

const createCardTemplate = () => {
  return (
    `<article class="film-card">
            <h3 class="film-card__title">The Dance of Life</h3>
            <p class="film-card__rating">8.3</p>
            <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
            </p>
            <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
            <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
            <a class="film-card__comments">5 comments</a>
            <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
        </article>`
  );
};

const createStatisticTemplate = () => {
  return (
    `<section class="statistic">
        </section>`
  );
};

const createUserRankTemplate = () => {
  return (
    `<p class="statistic__rank">
            Your rank
            <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            <span class="statistic__rank-label">Sci-Fighter</span>
        </p>`
  );
};

const createStatisticFiltersTemplate = () => {
  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
    
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>
    
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>
    
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>
    
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>
    
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>`
  );
};

const createStatisticContentTemplate = () => {
  return (
    `<ul class="statistic__text-list">
            <li class="statistic__text-item">
                <h4 class="statistic__item-title">You watched</h4>
                <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
            </li>
            <li class="statistic__text-item">
                <h4 class="statistic__item-title">Total duration</h4>
                <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
            </li>
            <li class="statistic__text-item">
                <h4 class="statistic__item-title">Top genre</h4>
                <p class="statistic__item-text">Sci-Fi</p>
            </li>
        </ul>`
  );
};

const createstatisticChart = () => {
  return (
    `<div class="statistic__chart-wrap">
            <canvas class="statistic__chart" width="1000"></canvas>
        </div>`
  );
};

const createFilmsCountTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
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
render(statisticElement, createstatisticChart(), `beforeend`);

const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticElement, createFilmsCountTemplate(), `beforeend`);
