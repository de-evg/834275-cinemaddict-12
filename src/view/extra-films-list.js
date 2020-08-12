import {createElement} from "../utils.js";

class ExtraFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="films-list--extra">              
              <div class="films-list__container"></div>            
            </section>`;
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

export default ExtraFilmsList;
