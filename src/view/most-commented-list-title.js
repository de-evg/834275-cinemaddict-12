import AbstractView from "./abstract.js";

class MostCommentedListTitle extends AbstractView {
  getTemplate() {
    return `<h2 class="films-list__title">Most commented</h2>`;
  }
}

export default MostCommentedListTitle;
