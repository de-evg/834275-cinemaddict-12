import {createElement} from "../utils.js";

class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  crateFilterItemTemplate(filterName, count) {
    const title = `${filterName[0].toUpperCase()}${filterName.slice(1)}`;
    return `<a href="#${filterName}" class="main-navigation__item">
              ${title}
              <span class="main-navigation__item-count">${count}</span>
            </a>`;
  }

  getTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter) => this.crateFilterItemTemplate(filter.name, filter.count))
      .join(``);
    return `<nav class="main-navigation">
              <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
                ${filterItemsTemplate}
              </div>
              <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`;
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

export default Filter;
