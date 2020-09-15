import CommentPresenter from "./comment-item.js";
import LoadingCommentsView from "../view/loading-comments.js";
import {UpdateType, UserAction} from "../const.js";
import {render, createElement, RenderPosition, remove} from "../utils/render.js";

class CommentList {
  constructor(popupComponent, film, commentModel, changeData, api) {
    this._popupComponent = popupComponent;
    this._film = film;
    this._commentListContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._api = api;

    this._loadingCommentsComponent = new LoadingCommentsView();

    this._onLoadCommentsError = false;
    this._isLoading = true;

    this._commentPresenter = {};

    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);

    this._comments = [];
    this._commentModel.setComments(this._film.id, this._comments);
    this._loadComments();
  }

  init() {
    this._renderCommentList();
  }

  _loadComments() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentModel.setComments(this._film.id, comments);
        this._isLoading = false;
        this._renderCommentList();
      })
      .catch(() =>{
        this._isLoading = false;
        this._onLoadCommentsError = true;
        this._renderCommentList();
      });
  }

  _renderComment(comment) {
    this._comment = comment;
    const commentPresenter = new CommentPresenter(this._commentListContainer, this._handleDeleteBtnClick, this._commentModel);
    commentPresenter.init(this._comment);
    this._commentPresenter[this._comment.id] = commentPresenter;
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  _renderCommentList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    remove(this._loadingCommentsComponent);
    if (!this._onLoadCommentsError) {
      this._comments = this._commentModel.getComments(this._film.id);
      this._renderComments(this._comments);
      return;
    }
    this._renderError();
  }

  _renderLoading() {
    render(this._commentListContainer, this._loadingCommentsComponent, RenderPosition.BEFOREEND);
  }

  _renderError() {
    render(this._commentListContainer, createElement(`<li class="film-details__comment-text">Failed to load comments</li>`), RenderPosition.BEFOREEND);
  }

  _updateCommentsCount(update) {
    const index = update.film.comments.findIndex((commentID) => commentID === update.commentID);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    update.film.comments = [
      ...update.film.comments.slice(0, index),
      ...update.film.comments.slice(index + 1)
    ];
  }

  _handleDeleteBtnClick(commentID) {
    const update = {
      commentID,
      film: this._film,
      updateCommentsCount: this._updateCommentsCount
    };

    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        update
    );
  }
}

export default CommentList;
