import MoviePresenter from "./movie.js";
import TopRatedListPresenter from "./top-rated-list.js";
import MostCommentedListPresenter from "./most-commented-list.js";

import FilmsContainerView from "../view/films-container.js";
import FilmListView from "../view/film-list.js";
import AllFilmsListTitleView from "../view/all-film-list-title.js";
import NoFilmsView from "../view/no-films.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import SortView from "../view/sort.js";
import LoadingFilmsView from "../view/loading-films.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {sortByRelease, sortByRating} from "../utils/sort.js";
import {filter} from "../utils/filter.js";

import {SortType, UpdateType, UserAction, Mode} from "../const.js";

const FILMS_STEP = 5;

class MovieList {
  constructor(siteMainElement, filmsModel, filterModel, commentsModel, api) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._titleMainListComponent = new AllFilmsListTitleView();
    this._loadingMoreBtnComponent = new LoadMoreBtnView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadingFilmsComponent = new LoadingFilmsView();

    this._renderedFilmCount = FILMS_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmPresenter = {};
    this._isLoading = true;

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._removeAllPopups = this._removeAllPopups.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._topRatedFilmListPresenter = new TopRatedListPresenter(this._filmsModel, this._commentsModel, this._handleViewAction, this._removeAllPopups, this._api);
    this._mostCommentedFilmsListPresenter = new MostCommentedListPresenter(this._filmsModel, this._commentsModel, this._handleViewAction, this._removeAllPopups, this._api);

    this._renderSort();
    this._renderFilmsContainer();
    this._mainFilmListComponent = new FilmListView();
    this._filmsContainer = this._mainFilmListComponent.getElement().querySelector(`.films-list__container`);
    render(this._filmsContainerComponent, this._mainFilmListComponent, RenderPosition.BEFOREEND);

    this._renderFilmList();
  }

  destroy() {
    this._clearBoard();
    remove(this._sortComponent);
    remove(this._filmsContainerComponent);
    remove(this._mainFilmListComponent);
  }

  _removePopups(filmPresenter = this._filmPresenter) {
    Object
      .values(filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _removeAllPopups(filmPresenter) {
    this._removePopups();
    this._topRatedFilmListPresenter.removeTopRatedPopups(filmPresenter);
    this._mostCommentedFilmsListPresenter.removeMostCommentedPopups(filmPresenter);
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

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    if (this._titleMainListComponent) {
      remove(this._titleMainListComponent);
    }

    remove(this._loadingFilmsComponent);
    remove(this._noFilmsComponent);
    remove(this._loadingMoreBtnComponent);

    this._topRatedFilmListPresenter.destroy();
    this._mostCommentedFilmsListPresenter.destroy();

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILMS_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmsCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
      this._renderSort();
    }
  }

  _renderTopRatedFilms() {
    this._topRatedFilmListPresenter.init(this._filmsContainerComponent);
  }

  _renderMostCommentedFilms() {
    this._mostCommentedFilmsListPresenter.init(this._filmsContainerComponent);
  }

  _renderFilmsContainer() {
    let prevFilmsContainerComponent = null;
    if (this._siteMainElement.querySelector(`.films`)) {
      prevFilmsContainerComponent = this._filmsContainerComponent;
    }

    this._filmsContainerComponent = new FilmsContainerView();

    if (prevFilmsContainerComponent) {
      replace(this._filmsContainerComponent, prevFilmsContainerComponent);
      remove(prevFilmsContainerComponent);
      return;
    }
    render(this._siteMainElement, this._filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _hanldeModeChange() {
    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  _renderTitle() {
    render(this._mainFilmListComponent, this._titleMainListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    render(this._mainFilmListComponent, this._loadingFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoFilms() {
    render(this._mainFilmListComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    render(this._mainElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _sortFilms(sortType) {
    this._currentSortType = sortType;
  }

  _renderFilm(container, film) {
    if (!this._filmPresenter[film.id]) {
      const moviePresenter = new MoviePresenter(this._commentsModel, this._handleViewAction, this._removeAllPopups, this._api);
      this._filmPresenter[film.id] = moviePresenter;
    }
    this._filmPresenter[film.id].init(film, container);
  }

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _renderMainFilmList() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!films.length) {
      this._renderNoFilms();
      return;
    }

    this._renderTitle();

    this._renderFilms(this._filmsContainer, films.slice(0, Math.min(filmsCount, this._renderedFilmCount)));
    if (films.length > this._renderedFilmCount) {
      this._renderLoadMoreBtn();
    }
  }

  _renderLoadMoreBtn() {
    render(this._mainFilmListComponent, this._loadingMoreBtnComponent, RenderPosition.BEFOREEND);
    this._loadingMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderFilmList() {
    this._renderMainFilmList();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _renderSort() {
    let prevSortCompnent = null;
    if (this._siteMainElement.querySelector(`.sort`)) {
      prevSortCompnent = this._sortComponent;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (prevSortCompnent) {
      replace(this._sortComponent, prevSortCompnent);
      remove(prevSortCompnent);
      return;
    }
    render(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _resetSort() {
    this._renderedFilmCount = FILMS_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._renderSort();
  }

  _reInitFilmLists() {
    this._renderFilmList();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.CLOSE_POPUP:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.CHANGE_CONTROL:
        this._api.updateFilm(update)
          .then((updatedFilm) => {
            updatedFilm.isFormDisabled = false;
            updatedFilm.commentsData = this._commentsModel.getComments(updatedFilm.id);
            this._filmsModel.updateFilm(updateType, updatedFilm);
          });
        break;
      case UserAction.CHANGE_POPUP_CONTROL:
        this._api.updateFilm(update)
          .then((updatedFilm) => {
            updatedFilm.mode = Mode.DETAILS;
            updatedFilm.isFormDisabled = false;
            updatedFilm.commentsData = this._commentsModel.getComments(updatedFilm.id);
            this._filmsModel.updateFilm(updateType, updatedFilm);
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(update.commentID)
          .then(() => {
            this._commentsModel.deleteComment(update.film, update.commentID);
          })
          .then(() => {
            update.updateCommentsCount(update);
            update.film.mode = Mode.DETAILS;
            update.film.commentsData = this._commentsModel.getComments(update.film.id);
            this._filmsModel.updateFilm(updateType, update.film);
          })
          .catch(() => {
            const commentElement = document.querySelector(`#comment${update.commentID}`);
            const oldDeleteBtnElement = commentElement.querySelector(`.film-details__comment-delete`);
            const newDeleteBtnElement = oldDeleteBtnElement.cloneNode();
            newDeleteBtnElement.innerHTML = `Delete`;
            newDeleteBtnElement.removeAttribute(`disabled`);
            replace(newDeleteBtnElement, oldDeleteBtnElement);
            commentElement.classList.add(`shake`);
          });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update.newComment)
          .then((response) => {
            const {updatedFilm, updatedComments} = response;
            this._commentsModel.resetNewComment();
            this._commentsModel.addComment(updatedFilm.id, updatedComments);
            return updatedFilm;
          })
          .then((updatedFilm) => {
            updatedFilm.mode = Mode.DETAILS;
            updatedFilm.commentsData = this._commentsModel.getComments(updatedFilm.id);
            this._filmsModel.updateFilm(updateType, updatedFilm);
          })
          .catch(() => {
            const newMessageFormElement = document.querySelector(`.film-details__new-comment`);
            newMessageFormElement.classList.add(`shake`);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._hanldeModeChange();
        this._clearBoard(data);
        this._reInitFilmLists();
        break;
      case UpdateType.MAJOR:
        this._hanldeModeChange();
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._reInitFilmLists();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingFilmsComponent);
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.init();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._handleModelEvent(UpdateType.MINOR, {resetRenderedFilmCount: true, resetSortType: false});
  }

  _handleLoadMoreBtnClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmsCount, this._renderedFilmCount + FILMS_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(this._filmsContainer, films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmsCount) {
      remove(this._loadingMoreBtnComponent);
    }
  }
}

export default MovieList;
