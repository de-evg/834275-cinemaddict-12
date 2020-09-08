import {createElement} from "../utils/render.js";

class Abstract {
  constructor() {
    if (new.target instanceof Abstract) {
      throw new Error(`Can't instantaite Abstract? only cocrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  hide() {
    this.getElement().hidden = true;
  }

  show() {
    this.getElement().hidden = false;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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

export default Abstract;
