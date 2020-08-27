import CommentPresenter from "./Comment.js";

import NewCommentView from "../view/new-comment.js";


class CommentList {
  constructor(popupComponent, commentModel) {
    this._popupComponent = popupComponent;
    this._commentModel = commentModel;
    this._newCommetComponent = new NewCommentView();    
    this._commentPresenter = {};
  }

  init(comments) {
    this._commentModel.setComments(comments);
    this._commentList = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);    
  }

  _renderComment(comment) {
    const commentPresenter = new CommentPresenter(this._commentList);
    commentPresenter.init(comment);
    this._commentPresenter[comment.id] = commentPresenter;
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  _renderCommentList() {
    const comments = this._commentModel.getComments();
    this._renderComments(comments);
  }
}

export default CommentList;
