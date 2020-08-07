const createStatisticContentTemplate = (statistic) => {
  const {watched, duration, genre} = statistic;
  const minutes = (duration % 60);
  const hours = (duration / 60).toFixed();
  return (
    `<ul class="statistic__text-list">
              <li class="statistic__text-item">
                  <h4 class="statistic__item-title">You watched</h4>
                  <p class="statistic__item-text">${watched} <span class="statistic__item-description">movies</span></p>
              </li>
              <li class="statistic__text-item">
                  <h4 class="statistic__item-title">Total duration</h4>
                  <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
              </li>
              <li class="statistic__text-item">
                  <h4 class="statistic__item-title">Top genre</h4>
                  <p class="statistic__item-text">${genre}</p>
              </li>
          </ul>`
  );
};

export {createStatisticContentTemplate};
