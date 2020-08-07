const createUserRankTemplate = (statistic) => {
  const {rank} = statistic;
  return (
    `<p class="statistic__rank">
              Your rank
              <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              <span class="statistic__rank-label">${rank}</span>
          </p>`
  );
};

export {createUserRankTemplate};
