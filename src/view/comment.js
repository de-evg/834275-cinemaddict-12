import he from "he";
import SmartView from "./smart.js";
import {formatCommentDate} from "../utils/comment.js";

class Comment extends SmartView {
  constructor(comment) {
    super();
    this._data = Comment.parseCommentToData(comment);
    this._deleteBtnClickHandler = this._deleteBtnClickHandler.bind(this);
  }

  getTemplate() {
    const date = formatCommentDate(this._data.date);
    return `<li class="film-details__comment" id="comment${this._data.id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${this._data.emoji}.png" width="55" height="55" alt="emoji-${this._data.emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(this._data.comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this._data.author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().addEventListener(`click`, this._deleteBtnClickHandler);
  }

  restoreHandlers() {
    this.getElement().addEventListener(`click`, this._deleteBtnClickHandler);
  }

  _deleteBtnClickHandler(evt) {
    if (evt.target.tagName === `BUTTON`) {
      evt.preventDefault();
      this.getElement().classList.remove(`shake`);
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
