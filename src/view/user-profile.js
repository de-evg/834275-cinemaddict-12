import {createElement} from "../utils.js";

class UserProfile {
  constructor(rang) {
    this._element = null;
    this._rang = rang;
  }

  getTemplate() {
    return `<section class="header__profile profile">
              <p class="profile__rating">${this._rang}</p>
              <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
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

export default UserProfile;
