import he from "he";
import SmartView from "./smart.js";
import {formatCommentDate} from "../utils/comment.js";

class Comment extends SmartView {
  constructor(comment, notDeletedComment) {
    super();
    this._data = Comment.parseCommentToData(comment);
    this._data.isFormDisabled = false;
    this._notDeletedComment = notDeletedComment;
    this._deleteBtnClickHandler = this._deleteBtnClickHandler.bind(this);
  }

  getTemplate() {
    const date = formatCommentDate(this._data.date);
    return `<li class="film-details__comment ${this._notDeletedComment === this._data.id ? `shake` : ``}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${this._data.emoji}.png" width="55" height="55" alt="emoji-${this._data.emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(this._data.comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this._data.author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" ${this._data.isFormDisabled ? `disabled` : ``}>${this._data.isFormDisabled ? `Deleting…` : `Delete`}</button>
      </p>
    </div>
  </li>`;
  }

  restoreHandlers() {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteBtnClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteBtnClickHandler);
  }

  onErrorHandler() {
    this.updateData({isFormDisabled: false});
  }

  _deleteBtnClickHandler(evt) {
    evt.preventDefault();
    if (!this._data.isFormDisaled) {
      this.updateData({isFormDisabled: true});
      this._callback.deleteClick();
    }
  }

  static parseCommentToData(comment) {
    return Object.assign(
        {},
        comment
    );
  }
}

export default Comment;
