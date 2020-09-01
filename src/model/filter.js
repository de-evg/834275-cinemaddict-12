import Observer from "../utils/observer.js";
import {FilterType} from "../const.js";

class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilter(actionType, filter) {
    this._activeFilter = filter;

    this._notify(actionType, filter);
  }
}

export default Filter;
