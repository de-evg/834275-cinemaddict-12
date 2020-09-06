import CommentPresenter from "./comment-item.js";
import {UpdateType, UserAction} from "../const.js";
import {remove} from "../utils/render.js";

class CommentList {
  constructor(popupComponent, film, commentModel, changeData, api) {
    this._popupComponent = popupComponent;
    this._film = film;
    this._commentListContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._api = api;

    this._commentPresenter = {};
    this._comments = [];
    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
    this._handleCommentModelChange = this._handleCommentModelChange.bind(this);
    this._setComments();
  }

  init() {
    this._renderCommentList();
  }

  _clearCommentsBoard() {
    Object
      .values(this._commentPresenter)
      .forEach((presenter) => presenter.destroy());
  }

  _setComments() {
    this._commentModel.setComments(this._film.id, this._comments);
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentModel.setComments(this._film.id, comments);
        this._handleCommentModelChange();
      })
      .catch(() =>{
        this._commentModel.setComments(this._film.id, this._comments);
      });
  }

  _renderComment(comment) {
    this._comment = comment;
    const commentPresenter = new CommentPresenter(this._commentListContainer, this._handleDeleteBtnClick, this._handleCommentSubmit);
    commentPresenter.init(this._comment);
    this._commentPresenter[this._comment.id] = commentPresenter;
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  _renderCommentList() {
    this._comments = this._commentModel.getComments(this._film.id);
    this._renderComments(this._comments);
  }

  _updateCommentsCount(update) {
    const index = this._film.comments.findIndex((commentID) => commentID === update);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._film.comments = [
      ...this._film.comments.slice(0, index),
      ...this._film.comments.slice(index + 1)
    ];
  }

  _handleDeleteBtnClick(commentID) {
    this._updateCommentsCount(commentID);
    const update = {
      commentID,
      film: this._film
    };
    this._commentPresenter[update.commentID].destroy();
    delete this._commentPresenter[update.commentID];
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MAJOR,
        update
    );
  }

  _handleCommentModelChange() {
    this._clearCommentsBoard();
    this._renderCommentList();
  }
}

export default CommentList;
