import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import FilmListView from "../view/films-list.js";
import AllFilmsListTitleView from "../view/all-film-list-title.js";
import NoDataView from "../view/no-data.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import {render, RenderPosition, insert, remove} from "../utils/render.js";

const FILMS_STEP = 5;
const siteBodyElement = document.querySelector(`body`);

class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = FILMS_STEP;
    this._currentSortType = null;
    this._mainMovieList = new FilmListView();
    this._titleMainList = new AllFilmsListTitleView();
    this._filmsContainerElement = this._mainMovieList.getElement().querySelector(`.films-list__container`);
    this._loadingMoreBtn = new LoadMoreBtnView();
    this._noDataTitle = new NoDataView();

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    render(this._movieListContainer, this._mainMovieList, RenderPosition.BEFOREEND);

    this._renderMovieList(this._films);
  }

  _renderTitle() {
    render(this._mainMovieList, this._titleMainList, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {

  }

  _renderSort() {

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

  _renderMainFilmList(films) {
    this._renderFilms(0, Math.min(films.length, this._renderedFilmsCount));

    if (films.length >= this._renderedFilmsCount) {
      this._renderLoadMoreBtn();
    }
  }

  _renderNoData() {
    render(this._movieListContainer, this._noDataTitle, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreBtnClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_STEP);
    this._renderedFilmsCount += FILMS_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._loadingMoreBtn);
    }
  }

  _renderLoadMoreBtn() {
    render(this._mainMovieList, this._loadingMoreBtn, RenderPosition.BEFOREEND);
    this._loadingMoreBtn.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderMovieList() {
    if (this._films.length) {
      this._renderTitle();
      this._renderMainFilmList(this._films);
    } else {
      this._renderNoData();
    }
  }
}

export default MovieList;
