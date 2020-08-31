import MoviePresenter from "./movie.js";

import BoardView from "../view/board.js";
import FilmListView from "../view/films-list.js";
import AllFilmsListTitleView from "../view/all-film-list-title.js";
import NoFilmsView from "../view/no-films.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import SortView from "../view/sort.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByRelease, sortByRating} from "../utils/sort.js";
import {filter} from "../utils/filter.js";

import {SortType, UpdateType, UserAction} from "../const.js";

const FILMS_STEP = 5;
const siteBodyElement = document.querySelector(`body`);

class FilmList {
  constructor(siteMainElement, filmsModel, filterModel, commentModel) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentModel = commentModel;
    this._boardComponent = new BoardView();
    this._mainMovieListComponent = new FilmListView();
    this._titleMainListComponent = new AllFilmsListTitleView();
    this._loadingMoreBtnComponent = new LoadMoreBtnView();
    this._noFilmsComponent = new NoFilmsView();
    this._sortComponent = new SortView();

    this._renderedFilmCount = FILMS_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmPresenter = {};

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._filmsContainer = this._mainMovieListComponent.getElement().querySelector(`.films-list__container`);
    render(this._boardComponent, this._mainMovieListComponent, RenderPosition.BEFOREEND);
    this._renderSort();
    render(this._siteMainElement, this._boardComponent, RenderPosition.BEFOREEND);
    this._renderFilmList();
  }

  destroy() {
    this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._commentModel.removeObserver(this._handleModelEvent);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._mainMovieListComponent);
    remove(this._boardComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILMS_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmsCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);
    switch (this._currentSortType) {
      case SortType.RELEASE:
        return filtredFilms.slice().sort(sortByRelease);
      case SortType.RATING:
        return filtredFilms.slice().sort(sortByRating);
      default:
        return filtredFilms;
    }
  }

  _renderTitle() {
    render(this._mainMovieListComponent, this._titleMainListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    render(this._mainElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _sortFilms(sortType) {
    this._currentSortType = sortType;
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._renderedFilmCount = FILMS_STEP;
  }

  _renderFilm(film) {
    const moviePresenter = new MoviePresenter(siteBodyElement, this._commentModel, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(film, this._filmsContainer);
    this._filmPresenter[film.id] = moviePresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderMainFilmList() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if (!films.length) {
      this._renderNoFilms();
    }

    this._renderTitle();
    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmCount)));
    if (films.length >= this._renderedFilmCount) {
      this._renderLoadMoreBtn();
    }
  }

  _renderNoFilms() {
    render(this._movieListContainer, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreBtn() {
    render(this._mainMovieListComponent, this._loadingMoreBtnComponent, RenderPosition.BEFOREEND);
    this._loadingMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderFilmList() {
    this._renderMainFilmList();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_TO_WATCHLIST:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_TO_WATCHED:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_TO_FAVORITES:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.init();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetPopupView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderMainFilmList();
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleFilmChange(updateType, updatedFilm) {
    this._filmsModel.updateFilm(updateType, updatedFilm);
    this._udpateFilters(this._filmsModel.getFilms());
    this._filmPresenter[updatedFilm.id].init(updatedFilm, this._filmsContainer);
  }

  _handleLoadMoreBtnClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmsCount, this._renderedFilmCount + FILMS_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmsCount) {
      remove(this._loadingMoreBtnComponent);
    }
  }
}

export default FilmList;
