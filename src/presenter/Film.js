import CommentListPresenter from "./CommentList.js";


import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import PopupControls from "../view/popup-controls.js";
import NewCommentFormView from "../view/new-comment.js";

import {UpdateType, UserAction} from "../const.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";

class Film {
  constructor(popupContainer, commentModel, changeData, resetView) {
    this._popupContainer = popupContainer;
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._resetView = resetView;
    this._commentPresenter = {};


    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handlePopupControlChange = this._handlePopupControlChange.bind(this);
    this._EscKeyDownHandler = this._EscKeyDownHandler.bind(this);
  }

  init(film, filmsContainer) {
    this._film = film;
    this._filmsContainer = filmsContainer;

    this._prevFilmComponent = this._filmComponent;
    this._prevFilmPopupComponent = this._filmPopupComponent;

    this._initFilm();
    this._initPopup();

    if (!this._prevFilmComponent || !this._prevFilmPopupComponent) {
      this._renderFilm();
      return;
    }

    replace(this._filmComponent, this._prevFilmComponent);
    replace(this._filmPopupComponent, this._prevFilmPopupComponent);

    remove(this._prevFilmComponent);
    remove(this._prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  _initFilm() {
    this._filmComponent = new FilmView(this._film);
    this._setFilmHandlers();
  }

  _renderNewCommentFormComponent() {
    render(this._commentsContainer, this._newCommetFormComponent, RenderPosition.BEFOREEND);
  }

  _renderPopupControls() {
    render(this._popupControlsContainer, this._popupControlsComponent, RenderPosition.BEFOREEND);
  }

  _renderComments(comments) {
    comments.forEach((comment) => {
      render(this._commentListContainer, new Comment(comment), RenderPosition.BEFOREEND);
    });
  }

  _renderPopupComponents() {
    this._renderPopupControls();
    this._commentListPresenter.renderUpdatedComments();
    this._renderNewCommentFormComponent();
  }

  _initPopup() {
    this._filmPopupComponent = new FilmPopupView(this._film);
    this._popupControlsComponent = new PopupControls(this._film);
    this._newCommetFormComponent = new NewCommentFormView(this._film);

    this._commentsContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-wrap`);
    this._popupControlsContainer = this._filmPopupComponent.getElement().querySelector(`.form-details__top-container`);

    this._commentListPresenter = new CommentListPresenter(this._filmPopupComponent, this._film, this._commentModel, this._changeData);
    this._commentListPresenter.init(this._film.comments);
    this._renderPopupComponents();
    this._setFilmPopupHandlers();
  }

  _setFilmHandlers() {
    this._filmComponent.setClickHandler(this._handleFilmClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _setFilmPopupHandlers() {
    this._filmPopupComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._popupControlsComponent.setChangeControlHandler(this._handlePopupControlChange);
  }

  _showPopup() {
    this.resetPopupView();
    this._renderPopup();
    document.addEventListener(`keydown`, this._EscKeyDownHandler);
  }

  resetPopupView() {
    this._removeOpenedPopup();
    this._commentsContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-wrap`);
    this._popupControlsContainer = this._filmPopupComponent.getElement().querySelector(`.form-details__top-container`);
    this._renderPopupComponents();
    this._setFilmPopupHandlers();
    this._renderPopup();
    document.addEventListener(`keydown`, this._EscKeyDownHandler);
  }

  _removeOpenedPopup() {
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._EscKeyDownHandler);
  }

  _handleFilmClick() {
    this._showPopup();
  }

  _handleFormSubmit(film) {
    this._changeData(film);
    this._removeOpenedPopup();
  }

  _EscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._handleFormSubmit(this._film);
      document.removeEventListener(`keydown`, this._EscKeyDownHandler);
    }
  }

  _handlePopupControlChange(actionType, update) {
    this._changeData(
        actionType,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            update
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.ADD_TO_WATCHLIST,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              inWatchlist: !this._film.inWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        UserAction.ADD_TO_WATCHED,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.ADD_TO_FAVORITES,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _renderPopup() {
    render(this._popupContainer, this._filmPopupComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm() {
    render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }
}

export default Film;
