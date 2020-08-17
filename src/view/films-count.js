import AbstractView from "./abstract.js";

class FilmsCount extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return `<p>${this._count} movies inside</p>`;
  }
}

export default FilmsCount;
