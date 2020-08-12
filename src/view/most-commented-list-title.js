import {createElement} from "../utils";

class MostCommentedListTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<h2 class="films-list__title">Most commented</h2>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default MostCommentedListTitle;
