import CommentListPresenter from "./comment-list.js";

import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import NewCommentFormView from "../view/new-comment.js";

import {UpdateType, UserAction, Mode} from "../const.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";

const siteBodyElement = document.querySelector(`body`);

class Movie {
  constructor(commentsModel, changeData, resetPopups, api) {
    this._popupContainer = siteBodyElement;
    this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._resetPopups = resetPopups;
    this._api = api;

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._handleEscKeyDown.bind(this);
    this._formSubmitHandle = this._handleFormSubmit.bind(this);
    this._handlePopupControlsChange = this._handlePopupControlsChange.bind(this);
  }

  init(film, filmsContainer) {
    this._film = film;
    this._mode = this._film.mode;
    this._filmsContainer = filmsContainer;

    this._prevFilmComponent = this._filmComponent;
    this._prevFilmPopupComponent = this._filmPopupComponent;

    this._initFilm();
    this._initPopup();

    if (this._prevFilmComponent === null) {
      this._renderFilm();
    } else {
      replace(this._filmComponent, this._prevFilmComponent);
      remove(this._prevFilmComponent);
    }

    if (this._mode === Mode.DETAILS) {
      this._showPopup();
      if (this._prevFilmPopupComponent) {
        remove(this._prevFilmPopupComponent);
      }
      return;
    }
  }

  destroy() {
    remove(this._filmComponent);
    this.resetView();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _setFilmHandlers() {
    this._filmComponent.setClickHandler(this._handleFilmClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _setPopupHandlers() {
    this._filmPopupComponent.setClosePopupHandler(this._handleCloseBtnClick);
    this._filmPopupComponent.setChangeControlHandler(this._handlePopupControlsChange);
  }

  _initFilm() {
    this._filmComponent = new FilmView(this._film);
    this._setFilmHandlers();
  }

  _initPopup() {
    this._filmPopupComponent = new FilmPopupView(this._film, this._handlePopupControlsChange);
    this._newCommetFormComponent = new NewCommentFormView(this._commentsModel, this._film);
  }

  _showPopup() {
    this._resetPopups();
    this._renderNewCommentFormComponent();
    this._commentListPresenter = new CommentListPresenter(this._filmPopupComponent, this._film, this._commentsModel, this._changeData, this._api);
    this._commentListPresenter.init();
    this._setPopupHandlers();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    document.addEventListener(`keydown`, this._formSubmitHandle);
    this._renderPopup();
    this._mode = Mode.DETAILS;
  }

  _closePopup() {
    this._commentsModel.resetNewComment();
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.removeEventListener(`keydown`, this._formSubmitHandle);
  }

  _renderNewCommentFormComponent() {
    this._commentsContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-wrap`);
    render(this._commentsContainer, this._newCommetFormComponent, RenderPosition.BEFOREEND);
  }

  _renderPopup() {
    render(this._popupContainer, this._filmPopupComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm() {
    render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmClick() {
    this._showPopup();
  }

  _handleCloseBtnClick() {
    this._closePopup();
    this._mode = Mode.DEFAULT;
    this._changeData(
        UserAction.CLOSE_POPUP,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              mode: this._mode,
              error: {
                onControlsChange: false
              }
            }
        )
    );
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._handleCloseBtnClick();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handlePopupControlsChange(update) {
    this._changeData(
        UserAction.CHANGE_POPUP_CONTROL,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            update
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.CHANGE_CONTROL,
        UpdateType.MINOR,
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
        UserAction.CHANGE_CONTROL,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched,
              watchingDate: new Date().toISOString()
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.CHANGE_CONTROL,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      this._newCommetFormComponent.getElement().classList.remove(`shake`);
      const newComment = this._commentsModel.getNewComment();
      if (newComment.currentComment && newComment.currentEmoji) {
        this._newCommetFormComponent.disableForm();
        const update = {
          newComment,
          film: this._film,
        };
        this._changeData(
            UserAction.ADD_COMMENT,
            UpdateType.MINOR,
            update
        );
      }
    }

  }
}

export default Movie;
