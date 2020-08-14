import AbstractView from "./abstract.js";

class LoadMoreBtn extends AbstractView {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}

export default LoadMoreBtn;
