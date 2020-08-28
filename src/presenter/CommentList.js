import CommentPresenter from "./Comment.js";

class CommentList {
  constructor(popupComponent, commentModel, changeData) {
    this._popupComponent = popupComponent;
    this._commentListContainer = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._commentModel = commentModel;
    this._changeData = changeData;
    this._commentPresenter = {};
  }

  init(comments) {
    this._commentModel.setComments(comments);
    this._renderCommentList();
  }

  _renderComment(comment) {
    this._comment = comment;
    const commentPresenter = new CommentPresenter(this._commentListContainer, this._changeData);
    commentPresenter.init(this._comment);
    this._commentPresenter[this._comment.id] = commentPresenter;
  }

  _renderComments(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  _handelDeleteClick(updateType, update) {
    this.commentModel.deleteComment(updateType, update);
    this._commentPresenter[this._comment.id].destry();

  }

  _renderCommentList() {
    const comments = this._commentModel.getComments();
    this._renderComments(comments);
  }
}

export default CommentList;
