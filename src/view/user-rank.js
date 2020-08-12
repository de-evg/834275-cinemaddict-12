import {createElement} from "../utils";

class UserRank {
  constructor(rank) {
    this._element = null;
    this._rank = rank;
  }

  getTemplate() {
    return `<p class="statistic__rank">
              Your rank
              <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              <span class="statistic__rank-label">${this._rank}</span>
            </p>`;
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

export default UserRank;
