import CommentView from "../view/comment.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UpdateType, UserAction} from "../const.js";

class Comment {
  constructor(commentContainer, changeData) {
    this._commentContainer = commentContainer;
    this._changeData = changeData;
    this._comment = null;

    this._handelDeleteClick = this._handelDeleteClick.bind(this);
  }

  init(comment) {
    this._comment = comment;
    this._commentComponent = new CommentView(this._comment);
    this._setCommentHanders();
    this._renderComment(this._comment);
  }

  _setCommentHanders() {
    this._commentComponent.setDeleteClickHandler(this._handelDeleteClick);
  }

  destroy() {
    remove(this._commentComponent);
  }

  _handelDeleteClick() {
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, this._comment);
  }

  _renderComment() {
    render(this._commentContainer, this._commentComponent, RenderPosition.BEFOREEND);
  }
}

export default Comment;
