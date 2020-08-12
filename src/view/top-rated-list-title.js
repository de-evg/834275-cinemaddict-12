import {createElement} from "../utils";

class TopRatedListTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<h2 class="films-list__title">Top rated</h2>`;
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

export default TopRatedListTitle;
