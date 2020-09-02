import Api from "../api";
import CommentPresenter from "./comment-item.js";
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

    this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
  }

  init() {
    this._getComments();
    this._renderCommentList();
  }

  _getComments() {
    this._api.getComments(this._film.id)
      .then((comments) => this._commentModel.setComments(comments));
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
    const comments = this._commentModel.getComments();
    this._renderComments(comments);
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
}

export default CommentList;
