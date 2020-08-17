import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import FilmListView from "../view/films-list.js";
import AllFilmsListTitleView from "../view/all-film-list-title.js";
import NoDataView from "../view/no-data.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import FilterView from "../view/filter.js";
import SortView from "../view/sort.js";
import {render, RenderPosition, insert, remove} from "../utils/render.js";
import {sortByRelease, sortByRating} from "../utils/film.js";
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

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films, filters) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._filters = filters.slice();

    render(this._boardElement, this._mainMovieListComponent, RenderPosition.BEFOREEND);
    this._renderMovieList(this._films);
  }

  _renderTitle() {
    render(this._mainMovieListComponent, this._titleMainListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    render(this._mainElement, new FilterView(this._filters), RenderPosition.AFTERBEGIN);
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
    this._filmsContainerElement.innerHTML = ``;
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

  _renderFilm(film) {
    const filmComponent = new FilmView(film);
    const filmPopupComponent = new FilmPopupView(film);

    const showPopupComponent = () => {
      insert(siteBodyElement, filmPopupComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopupComponent = () => {
      remove(filmPopupComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closePopupComponent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmComponent.setClickHandler(showPopupComponent);
    filmPopupComponent.setBtnCloseClickHandler(closePopupComponent);

    render(this._filmsContainerElement, filmComponent, RenderPosition.BEFOREEND);
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
