import {createElement} from "../utils";

class FilmsCount {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemplate() {
    return `<p>${this._count} movies inside</p>`
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

export default FilmsCount;
