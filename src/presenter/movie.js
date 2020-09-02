import CommentListPresenter from "./comment-list.js";

import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import NewCommentFormView from "../view/new-comment.js";

import {UpdateType, UserAction} from "../const.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`
};

class Film {
  constructor(popupContainer, commentModel, changeData, resetView) {
    this._popupContainer = popupContainer;
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._resetView = resetView;
    this._mode = Mode.DEFAULT;
    this._commentListPresenter = {};


    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePopupControlsChange = this._handlePopupControlsChange.bind(this);
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

  resetPopupView() {
    this._removeOpenedPopup();
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
    this._renderNewCommentFormComponent();
  }

  _createPopupComponents() {
    this._filmPopupComponent = new FilmPopupView(this._film, this._handlePopupControlsChange);
    this._newCommetFormComponent = new NewCommentFormView(this._commentModel);

    this._commentsContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-wrap`);
    this._popupControlsContainer = this._filmPopupComponent.getElement().querySelector(`.form-details__top-container`);

    this._commentListPresenter = new CommentListPresenter(this._filmPopupComponent, this._film, this._commentModel, this._changeData);
  }

  _initPopup() {
    this._createPopupComponents();
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
    this._filmPopupComponent.setBtnCloseClickHandler(this._handleCloseBtnClick);
    this._filmPopupComponent.setChangeControlHandler(this._handlePopupControlChange);
    this._filmPopupComponent.setSubmitHandler(this._handleFormSubmit);
  }

  _showPopup() {
    this._resetView();
    this._initPopup();
    this._commentListPresenter.init();
    this._renderPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DETAILS;
  }

  _removeOpenedPopup() {
    if (this._mode === Mode.DETAILS) {
      remove(this._filmPopupComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
      this._mode = Mode.DEFAULT;
    }
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
    this._removeOpenedPopup();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._handleCloseBtnClick();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handlePopupControlsChange(update) {
    this._changeData(
        UserAction.CHANGE_CONTROL,
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
              isWatched: !this._film.isWatched
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

  _handleFormSubmit() {
    if (this._newCommetFormComponent.getComment()) {
      this._commentModel.addComment(UserAction.ADD_COMMENT, this._newCommetFormComponent.getComment());
    }
    const update = this._commentModel.getComments();
    this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              comments: update
            }
        )
    );

  }
}

export default Film;
