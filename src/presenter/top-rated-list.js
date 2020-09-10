import MoviePresenter from "./movie.js";

import ExtraFilmsListView from "../view/extra-films-list.js";
import TopRatedListTitleView from "../view/top-rated-list-title.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {sortByRating} from "../utils/sort.js";

import {UpdateType} from "../const.js";

const EXTRA_FILMS_COUNT = 2;

class TopRatedFilmList {
  constructor(siteMainElement, filmsModel, commentModel, changeData, api) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._api = api;

    this._callback = {};

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
    this._topRatedFilmsContainer = this._topRatedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    this._renderTitle(this._topRatedFilmsListComponent, new TopRatedListTitleView());
    this._renderFilms(this._topRatedFilmsContainer, films);


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

  _renderFilm(container, film) {
    if (!this._topRatedFilmsPresenter[film.id]) {
      const moviePresenter = new MoviePresenter(this._commentModel, this._changeData, this._removePopups, this._api);
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

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._topRatedFilmListPresenter.patchFilm(data.id);
        break;
    }
  }
}

export default TopRatedFilmList;
