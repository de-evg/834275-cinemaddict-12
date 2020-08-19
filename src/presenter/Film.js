import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import {render, RenderPosition, insert, remove} from "../utils/render.js";

class Film {
  constructor(popupContainer) {
    this._popupContainerElement = popupContainer;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleBtnCloseClick = this._handleBtnCloseClick.bind(this);
  }

  init(film, filmsContainer) {
    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new FilmPopupView(film);
    this._filmsContainerElement = filmsContainer;

    this._filmComponent.setClickHandler(this._handleFilmClick);
    this._filmPopupComponent.setBtnCloseClickHandler(this._handleBtnCloseClick);

    this._renderFilm();
  }

  _handleFilmClick() {
    insert(this._popupContainerElement, this._filmPopupComponent);
    document.addEventListener(`keydown`, this.__EscKeyDownHandler);
  }

  _handleBtnCloseClick() {
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this.__EscKeyDownHandler);
    this._filmPopupComponent.setBtnCloseClickHandler(this._handleBtnCloseClick);
  }

  _EscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._handleBtnCloseClick();
      document.removeEventListener(`keydown`, this.__EscKeyDownHandler);
    }
  }

  _renderFilm() {
    render(this._filmsContainerElement, this._filmComponent, RenderPosition.BEFOREEND);
  }
}

export default Film;
