import AbstractView from "./abstract.js";

class LoadMoreBtn extends AbstractView {
  constructor() {
    super();
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}

export default LoadMoreBtn;
