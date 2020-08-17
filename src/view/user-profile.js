import AbstractView from "./abstract.js";

class UserProfile extends AbstractView {
  constructor(rang) {
    super();
    this._rang = rang;
  }

  getTemplate() {
    return `<section class="header__profile profile">
              <p class="profile__rating">${this._rang}</p>
              <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            </section>`;
  }
}

export default UserProfile;
