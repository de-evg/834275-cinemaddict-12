import {createElement} from "../utils.js";

class Abstract {
  constructor() {
    if (new.target instanceof Abstract) {
      throw new Error(`Can't instantaite Abstract? only cocrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Abstract;
