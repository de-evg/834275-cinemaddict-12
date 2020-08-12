import {createElement} from "../utils";

class Statistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="statistic"></section>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElment() {
    this._element = null;
  }
}

export default Statistic;
