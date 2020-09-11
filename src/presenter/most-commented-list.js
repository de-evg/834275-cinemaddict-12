import MoviePresenter from "./movie.js";

import ExtraFilmsListView from "../view/extra-films-list.js";
import MostCommentedListTitleView from "../view/most-commented-list-title.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {sortByComments} from "../utils/sort.js";
import {getRandomInteger} from "../utils/common.js";

import {Mode} from "../const.js";

const EXTRA_FILMS_COUNT = 2;

class MostCommentedFilmList {
  constructor(siteMainElement, filmsModel, commentModel, changeData, api) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._api = api;

    this._callback = {};

    this._mostCommentedFilmsPresenter = {};
  }

  init(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._films = this._filmsModel.getFilms();

    const prevMostCommenterdFilmsComponent = this._mostCommentedFilmsListComponent;

    if (!this._films.length) {
      return;
    }

    this._films = this._sortFilms();

    this._mostCommentedFilmsListComponent = new ExtraFilmsListView();
    this._mostCommentedFilmsContainer = this._mostCommentedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    this._renderTitle(this._mostCommentedFilmsListComponent, new MostCommentedListTitleView());
    this._renderFilms(this._mostCommentedFilmsContainer, this._films);


    if (prevMostCommenterdFilmsComponent) {
      replace(this._mostCommentedFilmsListComponent, prevMostCommenterdFilmsComponent);
      remove(prevMostCommenterdFilmsComponent);
      return;
    }
    render(this._filmsContainer, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    Object
      .values(this._mostCommentedFilmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._mostCommentedFilmsPresenter = {};
  }

  _renderFilm(container, film) {
    const filmWithHiddenPopup = Object.assign(
        {},
        film,
        {
          mode: Mode.DEFAULT
        }
    );

    if (!this._mostCommentedFilmsPresenter[filmWithHiddenPopup.id]) {
      const moviePresenter = new MoviePresenter(this._commentModel, this._changeData, this._removePopups, this._api);
      this._mostCommentedFilmsPresenter[filmWithHiddenPopup.id] = moviePresenter;
    }
    this._mostCommentedFilmsPresenter[filmWithHiddenPopup.id].init(filmWithHiddenPopup, container);
  }

  _renderFilms(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _renderTitle(container, title) {
    render(container, title, RenderPosition.AFTERBEGIN);
  }

  _sortFilms() {
    let result = [];
    const films = this._films.slice().sort(sortByComments);
    const maxCommentsCount = films[0].comments.length;
    const isCommentCountSame = films.every((film) => film.comments.length === maxCommentsCount);
    if (isCommentCountSame) {
      for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
        const start = getRandomInteger(0, films.length - 1);
        result.push(...films.splice(start, 1));
      }
      return result;
    }
    return films.slice(0, EXTRA_FILMS_COUNT);
  }
}

export default MostCommentedFilmList;
