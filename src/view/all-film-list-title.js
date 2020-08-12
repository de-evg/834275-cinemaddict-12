import {createElement} from "../utils.js";

class AllFilmListTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
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
export default AllFilmListTitle;
