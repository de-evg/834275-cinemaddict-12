import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

class SiteMenu extends AbstractView {
  constructor(activeMenuItem) {
    super();
    this._activeMenuItem = activeMenuItem;

    this._menuTypeChangeHandler = this._menuTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return `<nav class="main-navigation">              
              ${this._createStatisticMenuItemTemplate()}
            </nav>`;
  }

  setActiveMenuItem(activeMenuItem) {
    this._activeMenuItem = activeMenuItem;
  }

  setMenuTypeChangeHandler(callback) {
    this._callback.menuTypeChange = callback;
    this.getElement().addEventListener(`click`, this._menuTypeChangeHandler);
  }

  _createStatisticMenuItemTemplate() {
    return ``;
  }

  _menuTypeChangeHandler(evt) {
    if (evt.target.tagName === `A`) {
      evt.preventDefault();
      this._activeMenuType = evt.target.id;
      this._callback.menuTypeChange(evt.target.id);
    }
  }
}

export default SiteMenu;
