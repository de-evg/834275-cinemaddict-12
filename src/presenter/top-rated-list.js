import MoviePresenter from "./movie.js";

import ExtraFilmsListView from "../view/extra-films-list.js";
import TopRatedListTitleView from "../view/top-rated-list-title.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {sortByRating} from "../utils/sort.js";

const EXTRA_FILMS_COUNT = 2;

const siteBodyElement = document.querySelector(`body`);

class TopRatedFilmList {
  constructor(siteMainElement, filmsModel, commentModel, viewChange, modelChange, api) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._commentModel = commentModel;
    this._viewChange = viewChange;
    this._modelChange = modelChange;
    this._api = api;

    this._topRatedFilmsPresenter = {};
  }

  init(filmsContainer) {
    this._filmsContainer = filmsContainer;
    const films = this._getSortedFilms();

    const prevTopRatedFilmsComponent = this._topRatedFilmsListComponent;

    if (!films.length) {
      return;
    }

    this._topRatedFilmsListComponent = new ExtraFilmsListView();
    const topRatedFilmsContainer = this._topRatedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    this._renderTitle(this._topRatedFilmsListComponent, new TopRatedListTitleView());
    this._renderFilms(topRatedFilmsContainer, films);


    if (prevTopRatedFilmsComponent) {
      replace(this._topRatedFilmsListComponent, prevTopRatedFilmsComponent);
      remove(prevTopRatedFilmsComponent);
      return;
    }
    render(this._filmsContainer, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    Object
      .values(this._topRatedFilmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._topRatedFilmsPresenter = {};
  }

  hide() {
    this._topRatedFilmsListComponent.hide();
  }

  _renderFilm(container, film) {
    if (!this._topRatedFilmsPresenter[film.id]) {
      const moviePresenter = new MoviePresenter(siteBodyElement, this._commentModel, this._handleViewAction, this._removePopups, this._api);
      this._topRatedFilmsPresenter[film.id] = moviePresenter;
    }
    this._topRatedFilmsPresenter[film.id].init(film, container);
  }

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _renderTitle(container, title) {
    render(container, title, RenderPosition.AFTERBEGIN);
  }

  _getSortedFilms() {
    return this._filmsModel
      .getFilms()
      .slice()
      .sort(sortByRating)
      .slice(0, EXTRA_FILMS_COUNT);
  }
}

export default TopRatedFilmList;
