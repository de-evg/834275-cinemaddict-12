import SmartView from "./smart.js";
import {formatCommentDate} from "../utils/comment.js";

class Comment extends SmartView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._deleteBtnClickHandler = this._deleteBtnClickHandler.bind(this);
  }

  getTemplate() {
    const date = formatCommentDate(this._comment.date);
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${this._comment.message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this._comment.author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }

  _deleteBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteBtnClickHandler);
  }
}

export default Comment;
