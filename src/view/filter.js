import AbstractView from "./abstract.js";
import {FilterType} from "../const.js";

class Filter extends AbstractView {
  constructor(filters, activeFilterType) {
    super();
    this._filters = filters;
    this.activeFilterType = activeFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _crateFilterItemTemplate(type, name, count) {
    return `<a href="#${type}" class="main-navigation__item ${this.activeFilterType === type ? `main-navigation__item--active` : ``}" id="${type}">
              ${name}
              ${type !== FilterType.ALL
    ? `<span class="main-navigation__item-count">${count}</span>`
    : ``
}              
            </a>`;
  }

  getTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter) => this._crateFilterItemTemplate(filter.type, filter.name, filter.count))
      .join(``);
    return `<nav class="main-navigation">
              <div class="main-navigation__items">                
                ${filterItemsTemplate}
              </div>
              <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

export default Filter;
