import {createElement} from "../utils.js";

class LoadingFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<h2 class="films-list__title">Loading...</h2>`
  }

  getElelment() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removerElement() {
    this._element = null;
  }
}

export default LoadingFilms;
