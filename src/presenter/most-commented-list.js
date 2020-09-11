import MoviePresenter from "./movie.js";

import ExtraFilmsListView from "../view/extra-films-list.js";
import MostCommentedListTitleView from "../view/most-commented-list-title.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {sortByComments} from "../utils/sort.js";

import {Mode} from "../const.js";

const EXTRA_FILMS_COUNT = 2;

class MostCommentedFilmList {
  constructor(siteMainElement, filmsModel, commentModel, changeData, modelChange, api) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._modelChange = modelChange;
    this._api = api;

    this._callback = {};

    this._mostCommentedFilmsPresenter = {};
  }

  init(filmsContainer) {
    this._filmsContainer = filmsContainer;
    const films = this._getSortedFilms();

    const prevMostCommenterdFilmsComponent = this._mostCommentedFilmsListComponent;

    if (!films.length) {
      return;
    }

    this._mostCommentedFilmsListComponent = new ExtraFilmsListView();
    this._mostCommentedFilmsContainer = this._mostCommentedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    this._renderTitle(this._mostCommentedFilmsListComponent, new MostCommentedListTitleView());
    this._renderFilms(this._mostCommentedFilmsContainer, films);


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

  _getSortedFilms() {
    return this._filmsModel
      .getFilms()
      .slice()
      .sort(sortByComments)
      .slice(0, EXTRA_FILMS_COUNT);
  }
}

export default MostCommentedFilmList;
