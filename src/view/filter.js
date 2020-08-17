import AbstractView from "./abstract.js";

class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  _crateFilterItemTemplate(filterName, count) {
    const title = `${filterName[0].toUpperCase()}${filterName.slice(1)}`;
    return `<a href="#${filterName}" class="main-navigation__item">
              ${title}
              <span class="main-navigation__item-count">${count}</span>
            </a>`;
  }

  getTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter) => this._crateFilterItemTemplate(filter.name, filter.count))
      .join(``);
    return `<nav class="main-navigation">
              <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
                ${filterItemsTemplate}
              </div>
              <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`;
  }
}

export default Filter;
