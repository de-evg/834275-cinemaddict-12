
import Film from "./Film.js";
import FilmListView from "../view/films-list.js";

import AllFilmsListTitleView from "../view/all-film-list-title.js";
import NoDataView from "../view/no-data.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import FilterView from "../view/filter.js";
import SortView from "../view/sort.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItems} from "../utils/common.js";
import {sortByRelease, sortByRating, generateFilter} from "../utils/film.js";
import {SortType} from "../const.js";

const FILMS_STEP = 5;
const siteBodyElement = document.querySelector(`body`);

class MovieList {
  constructor(mainElement) {
    this._mainElement = mainElement;
    this._boardElement = this._mainElement.querySelector(`.films`);
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
    this._handleOpenNewPopup = this._handleOpenNewPopup.bind(this);
  }

  init(films, filters) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._filters = filters.slice();

    this._filterComponent = new FilterView(this._filters);
    render(this._boardElement, this._mainMovieListComponent, RenderPosition.BEFOREEND);
    this._renderMovieList(this._films);
  }

  _handleOpenNewPopup() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.removeOpenedPopup());
  }

  _renderTitle() {
    render(this._mainMovieListComponent, this._titleMainListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    render(this._mainElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RELEASE:
        this._films.sort(sortByRelease);
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

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
    this._renderMainFilmList(this._films);
  }

  _renderSort() {
    render(this._mainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItems(this._films, updatedFilm);
    this._sourcedFilms = updateItems(this._sourcedFilms, updatedFilm);
    this._udpateFilters(this._films);
    this._filmPresenter[updatedFilm.id].init(updatedFilm, this._filmsContainerElement);
  }

  _udpateFilters(films) {
    const filmsToFilter = films.slice();
    this._filters = generateFilter(filmsToFilter);
    remove(this._filterComponent);
    this._filterComponent = new FilterView(this._filters);
    render(this._mainElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new Film(siteBodyElement, this. _handleFilmChange, this._handleOpenNewPopup);
    filmPresenter.init(film, this._filmsContainerElement);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderMainFilmList() {
    this._renderFilms(0, Math.min(this._films.length, this._renderedFilmsCount));

    if (this._films.length >= this._renderedFilmsCount) {
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
    this._renderSort();
    this._renderFilters();
    if (this._films.length) {
      this._renderTitle();
      this._renderMainFilmList(this._films);
    } else {
      this._renderNoData();
    }
  }
}

export default MovieList;
