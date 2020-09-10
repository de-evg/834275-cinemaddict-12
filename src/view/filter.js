import AbstractView from "./abstract.js";
import {FilterType} from "../const.js";

class Filter extends AbstractView {
  constructor(filters, activeFilterType) {
    super();
    this._filters = filters;
    this._activeFilterType = activeFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter) => this._createFilterItemTemplate(filter.type, filter.name, filter.count))
      .join(``);

    return `<nav class="main-navigation">
              <div class="main-navigation__items">                
                ${filterItemsTemplate}
              </div>
              <a href="#stats" class="main-navigation__additional ${this._activeFilterType === FilterType.STATS ? `main-navigation__item--active` : ``}" id="${FilterType.STATS}">Stats</a>
            </nav>`;
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  _createFilterItemTemplate(type, name, count) {
    return `<a href="#${type}" class="main-navigation__item ${this._activeFilterType === type ? `main-navigation__item--active` : ``}" id="${type}">
              ${name}
              ${type !== FilterType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ``}              
            </a>`;
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName === `A` || evt.target.tagName === `SPAN`) {
      const targetID = evt.target.tagName === `A` ? evt.target.id : evt.target.parentElement.id;
      evt.preventDefault();
      this._callback.filterTypeChange(targetID);
    }
  }
}

export default Filter;
