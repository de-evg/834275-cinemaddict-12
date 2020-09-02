import ProfileRangView from "../view/profile-rang.js";

import {filter} from "../utils/filter.js";
import {FilterType} from "../const.js";
import {profileRang} from "../utils/profile-rang.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

class ProfileRang {
  constructor(profileRangContainer, filmsModel) {
    this._profileRangContainer = profileRangContainer;
    this._filmsModel = filmsModel;
    this._rang = null;

    this._handleProfileRangChange = this._handleProfileRangChange.bind(this);

    this._filmsModel.addObserver(this._handleProfileRangChange);
  }

  init() {
    this._films = this._filmsModel.getFilms();
    this._watchedFilmCount = filter[FilterType.HISTORY](this._films).length;
    this._setProfileRang();

    this._prevProfileRangComponent = this._profileRangComponent;
    this._profileRangComponent = new ProfileRangView(this._rang);

    if (!this._prevProfileRangComponent) {
      this._renderProfileRang();
      return;
    }

    replace(this._profileRangComponent, this._prevProfileRangComponent);
    remove(this._prevProfileRangComponent);
  }

  _setProfileRang() {    
    for (const entry of profileRang) {
      const range = entry[0];
      const rang = entry[1];
      if (range[0] <= this._watchedFilmCount && range[1] >= this._watchedFilmCount) {
        this._rang = rang;
      }
    }
  }

  _renderProfileRang() {
    render(this._profileRangContainer, this._profileRangComponent, RenderPosition.BEFOREEND);

  }

  _handleProfileRangChange() {
    this.init();
  }
}

export default ProfileRang;
