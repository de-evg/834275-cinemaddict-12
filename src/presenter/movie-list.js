import MoviePresenter from "./movie.js";

import BoardView from "../view/board.js";
import FilmListView from "../view/films-list.js";
import AllFilmsListTitleView from "../view/all-film-list-title.js";
import NoFilmsView from "../view/no-films.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import SortView from "../view/sort.js";
import LoadingFilmsView from "../view/loading-films.js";
import ExtraFilmsListView from "../view/extra-films-list.js";
import TopRatedListTitleView from "../view/top-rated-list-title.js";
import MostCommentedListTitleView from "../view/most-commented-list-title.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByRelease, sortByRating, sortByComments} from "../utils/sort.js";
import {filter} from "../utils/filter.js";

import {SortType, UpdateType, UserAction, ExtraFilmsType} from "../const.js";

const FILMS_STEP = 5;
const EXTRA_FILMS_COUNT = 2;
const siteBodyElement = document.querySelector(`body`);

class FilmList {
  constructor(siteMainElement, filmsModel, filterModel, commentModel, api) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentModel = commentModel;
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
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._boardComponent = new BoardView();
    this._sortComponent = new SortView(this._currentSortType);


    this._renderSort();
    render(this._siteMainElement, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderFilmList();
  }

  destroy() {
    this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._mainMovieListComponent);
    remove(this._topRatedFilmsListComponent);
    remove(this._mostCommentedFilmsListComponent);
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

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};
    this._renderedFilmCount = FILMS_STEP;

    remove(this._mainMovieListComponent);
    remove(this._topRatedFilmsListComponent);
    remove(this._mostCommentedFilmsListComponent);
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

  _getExtraFilms(extraType) {
    let films = this._filmsModel.getFilms();
    switch (extraType) {
      case ExtraFilmsType.TOP_RATED:
        films = films.slice()
        .sort(sortByRating)
        .slice(0, EXTRA_FILMS_COUNT);
        break;
      case ExtraFilmsType.MOST_COMMENTED:
        films = films.slice()
        .sort(sortByComments)
        .slice(0, EXTRA_FILMS_COUNT);
        break;
    }
    return films;
  }

  _renderTitle(container, title) {
    render(container, title, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    render(this._mainElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _sortFilms(sortType) {
    this._currentSortType = sortType;
  }

  _renderFilm(container, film) {
    const moviePresenter = new MoviePresenter(siteBodyElement, this._commentModel, this._handleViewAction, this._handleModeChange, this._api);
    moviePresenter.init(film, container);
    this._filmPresenter[film.id] = moviePresenter;
  }

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _renderMainFilmList() {
    const films = this._getFilms();
    const filmsCount = films.length;

    render(this._boardComponent, this._mainMovieListComponent, RenderPosition.BEFOREEND);
    this._renderTitle(this._mainMovieListComponent, this._titleMainListComponent);

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!films.length) {
      this._renderNoFilms();
    }

    this._filmsContainer = this._mainMovieListComponent.getElement().querySelector(`.films-list__container`);
    this._renderFilms(this._filmsContainer, films.slice(0, Math.min(filmsCount, this._renderedFilmCount)));
    if (films.length > this._renderedFilmCount) {
      this._renderLoadMoreBtn();
    }
  }

  _renderTopRatedFilms() {
    const films = this._getExtraFilms(ExtraFilmsType.TOP_RATED);

    if (!films.length) {
      return;
    }

    render(this._boardComponent, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = this._topRatedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    this._renderTitle(this._topRatedFilmsListComponent, new TopRatedListTitleView());
    this._renderFilms(topRatedFilmsContainer, films);
  }

  _renderMostCommentedFilms() {
    const films = this._getExtraFilms(ExtraFilmsType.MOST_COMMENTED);

    if (!films.length) {
      return;
    }

    render(this._boardComponent, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);
    const mostCommentedFilmsContainer = this._mostCommentedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    this._renderTitle(this._mostCommentedFilmsListComponent, new MostCommentedListTitleView());
    this._renderFilms(mostCommentedFilmsContainer, films);
  }

  _renderLoading() {
    render(this._mainMovieListComponent, this._loadingFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._mainMovieListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreBtn() {
    render(this._mainMovieListComponent, this._loadingMoreBtnComponent, RenderPosition.BEFOREEND);
    this._loadingMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderFilmList() {
    this._mainMovieListComponent = new FilmListView();
    this._topRatedFilmsListComponent = new ExtraFilmsListView();
    this._mostCommentedFilmsListComponent = new ExtraFilmsListView();

    this._renderMainFilmList();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.CHANGE_CONTROL:
        this._api.updateFilm(update).then((updatedFilm) => {
          this._filmsModel.updateFilm(updateType, updatedFilm);
        });
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update).then((response) => {
          const {updatedFilm, updatedComments} = response;
          this._commentModel.addComment(updatedFilm.id, updatedComments);
          this._filmsModel.updateFilm(updateType, updatedFilm);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data, resetSettings) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard(resetSettings);
        this.init();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.init();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingFilmsComponent);
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
    this._handleModelEvent(UpdateType.MINOR, null, {resetRenderedFilmCount: true, resetSortType: false});
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

    this._renderFilms(this._filmsContainer, films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmsCount) {
      remove(this._loadingMoreBtnComponent);
    }
  }
}

export default FilmList;
