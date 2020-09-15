import AbstractView from "./abstract.js";

class LoadingComments extends AbstractView {
  getTemplate() {
    return `<li class="film-details__comment-text">Loading...</li>`;
  }
}

export default LoadingComments;
