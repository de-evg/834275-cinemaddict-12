import AbstractView from "./abstract.js";

class StaticticContent extends AbstractView {
  constructor(statistic) {
    super();
    this._statistic = statistic;
  }

  getTemplate() {
    const {count, duration, genre} = this._statistic;
    const minutes = (duration % 60);
    const hours = Math.floor(duration / 60);
    return `<ul class="statistic__text-list">
              <li class="statistic__text-item">
                  <h4 class="statistic__item-title">You watched</h4>
                  <p class="statistic__item-text">${count} <span class="statistic__item-description">movies</span></p>
              </li>
              <li class="statistic__text-item">
                  <h4 class="statistic__item-title">Total duration</h4>
                  <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
              </li>
              <li class="statistic__text-item">
                  <h4 class="statistic__item-title">Top genre</h4>
                  <p class="statistic__item-text">${genre}</p>
              </li>
            </ul>`;
  }
}

export default StaticticContent;
