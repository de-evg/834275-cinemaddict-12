import Api from "../api";
import CommentPresenter from "./comment-item.js";
import {UpdateType, UserAction} from "../const.js";
import {Socket} from "../const.js";

class CommentList {
  constructor(popupComponent, film, commentModel, changeData) {
    this._api = new Api(Socket.END_POINT, Socket.AUTHORIZATION);
    this._popupComponent = popupComponent;
    this._film = film;
    this._commentListContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._commentPresenter = {};
    this._comments = [];
    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
    this._handleCommentModelChange = this._handleCommentModelChange.bind(this);    
  }

  init() {
    
    this._getComments();
    this._renderCommentList();
  }

  _clearCommentsBoard() {
    Object
      .values(this._commentPresenter)
      .forEach((presenter) => presenter.destroy());
  }

  _getComments() {
    this._commentModel.setComments(this._film.id, this._comments);
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentModel.setComments(this._film.id, comments);
        this._handleCommentModelChange();
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

  _handleDeleteBtnClick(actionType, updateType, update) {
    this._commentModel.deleteComment(actionType, update);
    this._commentPresenter[this._comment.id].destroy();
    this._changeData(
        actionType,
        updateType,
        Object.assign(
            {},
            this._film,
            {
              comments: this._commentModel.getComments()
            }
        )
    );
  }

  _handleCommentSubmit(actionType, updateType, update) {
    this._commentModel.addComment(actionType, update);
    this._changeData(
        actionType,
        updateType,
        Object.assign(
            {},
            this._film,
            {
              comments: this._commentModel.getComments()
            }
        )
    );
  }

  _handleCommentModelChange() {
    this._clearCommentsBoard();
    this._renderCommentList();
  }
}

export default CommentList;
