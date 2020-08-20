import SmartView from "./smart.js";

class Comments extends SmartView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  _createComment(comment) {
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }

  getTemplate() {
    if (!this._comments.length) {
      return ``;
    }

    return this._comments
        .map((comment) => this._createComment(comment))
        .join(``);
  }
}

export default Comments;
