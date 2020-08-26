import Film from "./Film.js";
import FilmListView from "../view/films-list.js";

import AllFilmsListTitleView from "../view/all-film-list-title.js";
import NoDataView from "../view/no-data.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import SortView from "../view/sort.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortByRelease, sortByRating} from "../utils/film.js";
import {SortType, UpdateType, UserAction} from "../const.js";

const FILMS_STEP = 5;
const siteBodyElement = document.querySelector(`body`);

class FilmList {
  constructor(mainElement, filmsModel) {
    this._mainElement = mainElement;
    this._boardElement = this._mainElement.querySelector(`.films`);
    this._filmsModel = filmsModel;
    this._mainMovieListComponent = new FilmListView();
    this._filmsContainerElement = this._mainMovieListComponent.getElement().querySelector(`.films-list__container`);
    this._titleMainListComponent = new AllFilmsListTitleView();
    this._loadingMoreBtnComponent = new LoadMoreBtnView();
    this._noDataTitleComponent = new NoDataView();
    this._sortComponent = new SortView();

    this._renderedFilmsCount = FILMS_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmPresenter = {};

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._boardElement, this._mainMovieListComponent, RenderPosition.BEFOREEND);
    this._renderMovieList(this._filmsModel.getFilms());
  }

  _getFilms() {
    const films = this._filmsModel.getFilms();
    switch (this._currentSortType) {
      case SortType.RELEASE:
        return films.sort(sortByRelease);
      case SortType.RATING:
        return films.sort(sortByRating);
      default:
        return films;
    }
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
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        //clearBoard
        //renderBoard
        break;
      case UpdateType.MAJOR:
        //счетчики отрисованных карточек и сортировку
        //clearBoard
        //renderBoard
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
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
    this._renderedFilmsCount = FILMS_STEP;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderMainFilmList(this._filmsModel.getFilms());
  }

  _renderSort() {
    render(this._mainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleFilmChange(updateType, updatedFilm) {
    this._filmsModel.updateFilm(updateType, updatedFilm);
    this._udpateFilters(this._filmsModel.getFilms());
    this._filmPresenter[updatedFilm.id].init(updatedFilm, this._filmsContainerElement);
  }

  _renderFilm(film) {
    const filmPresenter = new Film(siteBodyElement, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film, this._filmsContainerElement);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderMainFilmList(films) {
    this._renderFilms(films);

    if (films.length >= this._renderedFilmsCount) {
      this._renderLoadMoreBtn();
    }
  }

  _renderNoData() {
    render(this._movieListContainer, this._noDataTitleComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreBtnClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_STEP);
    this._renderedFilmsCount += FILMS_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._loadingMoreBtnComponent);
    }
  }

  _renderLoadMoreBtn() {
    render(this._mainMovieListComponent, this._loadingMoreBtnComponent, RenderPosition.BEFOREEND);
    this._loadingMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderMovieList() {
    const films = this._filmsModel.getFilms();
    const filmsCount = films.length;    

    if (!films.length) {
      this._renderNoData();
    }

    this._renderTitle();
    this._renderMainFilmList(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)));
  }
}

export default FilmList;
