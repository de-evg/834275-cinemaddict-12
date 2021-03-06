import CommentView from "../view/comment.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

class CommentItem {
  constructor(commentContainer, removeData, commentsModel) {
    this._commentContainer = commentContainer;
    this._removeData = removeData;
    this._commentsModel = commentsModel;
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
    const oldDeleteBtnElement = this._commentComponent.getElement().querySelector(`.film-details__comment-delete`);
    const newDeleteBtnElement = oldDeleteBtnElement.cloneNode();

    newDeleteBtnElement.innerHTML = `Deleting`;
    newDeleteBtnElement.setAttribute(`disabled`, `disabled`);
    replace(newDeleteBtnElement, oldDeleteBtnElement);

    this._removeData(this._comment.id);
  }
}

export default CommentItem;
