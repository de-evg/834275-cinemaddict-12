import AbstractView from "./abstract.js";

class TopRatedListTitle extends AbstractView {
  getTemplate() {
    return `<h2 class="films-list__title">Top rated</h2>`;
  }

}

export default TopRatedListTitle;
