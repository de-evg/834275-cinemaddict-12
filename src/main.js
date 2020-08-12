import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import BoardView from "./view/board.js";
import FilmListView from "./view/films-list.js";
import ExtraFilmsListView from "./view/extra-films-list.js";
import AllFilmsListTitleView from "./view/all-film-list-title.js";
import TopRatedListTitleView from "./view/top-rated-list-title.js";
import MostCommentedListTitleView from "./view/most-commented-list-title.js";
import NoDataTitleView from "./view/no-data-title.js";
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
const sortedFilmsBy = {
  all: films.slice(),
  rating: films
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .filter((film) => film.rating),
  comments: films
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .filter((film) => film.comments.length)
};
const profileRang = generateProfileRang();
const filters = generateFilter(films);

const renderFilms = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const filmPopupComponent = new FilmPopupView(film);

  const showPopupComponent = (evt) => {
    const target = evt.target;
    if (target.classList.contains(`film-card__title`) ||
      target.classList.contains(`film-card__poster`) ||
      target.classList.contains(`film-card__comments`)) {
      evt.preventDefault();
      siteBodyElement.appendChild(filmPopupComponent.getElement());
      filmPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, closePopupComponent);
      filmComponent.getElement().removeEventListener(`click`, showPopupComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    }

  };

  const closePopupComponent = (evt) => {
    evt.preventDefault();
    siteBodyElement.removeChild(filmPopupComponent.getElement());
    filmPopupComponent.removeElement();
    filmComponent.getElement().addEventListener(`click`, showPopupComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopupComponent();
      filmComponent.getElement().addEventListener(`click`, showPopupComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.getElement().addEventListener(`click`, showPopupComponent);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderMainFilmList = (boardFilms) => {
  const allFilmsListComponent = new FilmListView();
  render(boardComponent.getElement(), allFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
  render(allFilmsListComponent.getElement(), new AllFilmsListTitleView().getElement(), RenderPosition.AFTERBEGIN);
  render(allFilmsListComponent.getElement(), new LoadingFilmsView().getElelment(), RenderPosition.AFTERBEGIN);
  if (!films.length) {
    render(boardComponent.getElelment(), new NoDataTitleView().getElement(), RenderPosition.AFTERBEGIN);
  }
  const allFilmsListContainerElement = allFilmsListComponent.getElement().querySelector(`.films-list__container`);
  boardFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
    renderFilms(allFilmsListContainerElement, film);
  });

  const loadMoreBtnComponent = new LoadMoreBtnView();
  loadMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    boardFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
      render(allFilmsListContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND);
    });
    if (!boardFilms.length) {
      loadMoreBtnComponent.getElement().remove();
      loadMoreBtnComponent.removeElement();
    }
  });
  render(allFilmsListComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderExtraFilmList = (listTitleElement, boardFilms) => {
  if (boardFilms.length) {
    const extraFilmsListComponent = new ExtraFilmsListView();
    render(boardComponent.getElement(), extraFilmsListComponent.getElement(), RenderPosition.BEFOREEND);
    render(extraFilmsListComponent.getElement(), listTitleElement, RenderPosition.AFTERBEGIN);

    const filmListContainerElement = extraFilmsListComponent.getElement().querySelector(`.films-list__container`);
    boardFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
      renderFilms(filmListContainerElement, film);
    });
  }
};

render(siteHeaderElement, new UserProfileView(profileRang).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

renderMainFilmList(sortedFilmsBy.all);
renderExtraFilmList(new TopRatedListTitleView().getElement(), sortedFilmsBy.rating);
renderExtraFilmList(new MostCommentedListTitleView().getElement(), sortedFilmsBy.comments);

const statisticComponent = new StatisticView();
render(siteMainElement, statisticComponent.getElement(), RenderPosition.BEFOREEND);

const statistic = generateStaistic(films);
render(statisticComponent.getElement(), new UserRankView(statistic.rank).getElement(), RenderPosition.BEFOREEND);
render(statisticComponent.getElement(), new StatisticFiltersView().getElement(), RenderPosition.BEFOREEND);
render(statisticComponent.getElement(), new StaticticContentView(statistic).getElement(), RenderPosition.BEFOREEND);
render(statisticComponent.getElement(), new StatisticChartView().getElement(), RenderPosition.BEFOREEND);

render(footerStatisticElement, new FilmsCountView(films.length).getElement(), RenderPosition.BEFOREEND);
