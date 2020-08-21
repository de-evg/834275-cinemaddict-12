import AbstractView from "./abstract.js";

class CommentList extends AbstractView {
  getTemplate() {
    return `<ul class="film-details__comments-list"></ul>`;
  }
}

export default CommentList;
