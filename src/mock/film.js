import {getRandomInteger} from "../utils.js";
import {FILMS, POSTERS_URLS, DescCount, CommentCount, Year, GANRES, GanresCount} from "../const.js";


const filmDuration = {
  MIN_HOUR: 0,
  MAX_HOUR: 24,
  MIN_MINUTES: 0,
  MAX_MINUTES: 59
}

const generateTitle = () => {
  const index = getRandomInteger(0, FILMS.length - 1);
  return FILMS[index];
};

const generatePosterURL = () => {
  const index = getRandomInteger(0, POSTERS_URLS.length - 1);
  return POSTERS_URLS[index];
};

const generateDescription = () => {
  const someText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const phrases = someText.split(`. `);
  phrases[phrases.length - 1] = phrases[phrases.length - 1].slice(0, -1);
  const phreseCount = getRandomInteger(DescCount.MIN, DescCount.MAX);
  let description = [];
  for (let i = DescCount.MIN; i <= phreseCount; i++) {
    const index = getRandomInteger(0, phrases.length - 1);
    description.push(phrases[index]);
  }
  description = `${description.join(`. `)}.`;
  return description;
};

const generateRating = () => {
  const randomNum = Math.random(0, 10) * 100;
  const rating = +(Math.floor(randomNum) / 10).toFixed(1);
  return rating;
};

const generateGanres = () => {
  const ganres = new Set();
  for (let i = GanresCount.MIN; i < GanresCount.MAX; i++) {
    const index = getRandomInteger(0, GANRES.length - 1);
    ganres.add(GANRES[index]);
  }
  return ganres;
};

const generateDurations = (duration) => {
  const hour = getRandomInteger(duration.MIN_HOUR, duration.MAX_HOUR);
  const minutes = getRandomInteger(duration.MIN_MINUTES, duration.MAX_MINUTES);
  return `${hour}h${minutes}m`;
};

const generateFilm = () => {
  return {
    title: generateTitle(),
    poster: generatePosterURL(),
    description: generateDescription(),
    comments: getRandomInteger(CommentCount.MIN, CommentCount.MAX),
    rating: generateRating(),
    year: getRandomInteger(Year.MIN, Year.MAX),
    ganre: generateGanres(),
    duration: generateDurations(filmDuration)
  };
};

export {generateFilm};
