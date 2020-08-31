import AbstractView from "./abstract.js";

class StatisticRank extends AbstractView {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return `<p class="statistic__rank">
              Your rank
              <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              <span class="statistic__rank-label">${this._rank}</span>
            </p>`;
  }
}

export default StatisticRank;
