import AbstractView from "./abstract.js";
import {SortType} from "./const.js";

class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return `<ul class="sort">
              <li><a href="#" class="sort__button sort__button--active data-sort-type="${SortType.default}"">Sort by default</a></li>
              <li><a href="#" class="sort__button" data-sort-type=${SortType.date}>Sort by date</a></li>
              <li><a href="#" class="sort__button" data-sort-type=${SortType.rating}>Sort by rating</a></li>
            </ul>`;
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this._getElement().addEventListener(`click`, this._callback.sortTypeChange);
  }
}
export default Sort;
