import Abstract from "./abstract.js";

class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }
  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement(prevElement);

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }
}

export default Smart;
