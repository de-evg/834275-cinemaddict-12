import CommentView from "../view/comment.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {UpdateType, UserAction} from "../const.js";

class Comment {
  constructor(commentContainer, removeData, addData) {
    this._commentContainer = commentContainer;
    this._removeData = removeData;
    this._addData = addData;
    this._comment = null;

    this._handelDeleteClick = this._handelDeleteClick.bind(this);
  }

  init(comment) {
    this._comment = comment;
    this._commentComponent = new CommentView(this._comment);
    this._setCommentHandlers();
    this._renderComment(this._comment);
  }

  destroy() {
    remove(this._commentComponent);
  }

  _setCommentHandlers() {
    this._commentComponent.setDeleteClickHandler(this._handelDeleteClick);
  }

  _renderComment() {
    render(this._commentContainer, this._commentComponent, RenderPosition.BEFOREEND);
  }

  _handelDeleteClick() {
    this._removeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, this._comment);
  }

  _handleAddBtnPress() {
    this._addData(UserAction.DELETE_COMMENT, UpdateType.PATCH, this._newComment);
  }
}

export default Comment;
