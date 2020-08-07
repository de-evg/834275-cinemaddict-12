import {getRandomInteger} from "../utils.js";
import {DescCount, CommentCount, GenresCount} from "../const.js";
import {generateComment} from "./comment.js";

const Films = [`Harry Potter`, `Terminator 2`, `Interstellar`, `Alien`, `Predator`];
const Genres = [`Comedy`, `Horror`, `Fantasy`, `Drama`, `Science`];
const Directors = [`Martin Scorsese`, `Peter Jackson`, `Steven Spielberg`, `Guy Ritchie`];
const Countries = [`Russia`, `USA`, `France`, `Italy`, `UK`];
const Writers = [`Fedor Bondarchuk`, `Quentin Tarantino`, `Daria Doncova`, `George R. R. Martin`];
const Actors = [`Arnold Schwarzenegger`, `Danila Kozlovski`, `Pierre Richard`, `Louis de Funes`, `Rowan Sebastian Atkinson`];
const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const filmDuration = {
  MIN_HOUR: 0,
  MAX_HOUR: 24,
  MIN_MINUTES: 0,
  MAX_MINUTES: 59
};

const Age = {
  MIN: 0,
  MAX: 18
};

const generateReleaseDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date;
};

const generateTitle = () => {
  const index = getRandomInteger(0, Films.length - 1);
  return Films[index];
};

const generatePosterURL = () => {
  const index = getRandomInteger(0, Posters.length - 1);
  return Posters[index];
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

const generateGenres = () => {
  const genres = new Set();
  for (let i = GenresCount.MIN; i < GenresCount.MAX; i++) {
    const index = getRandomInteger(0, Genres.length - 1);
    genres.add(Genres[index]);
  }
  return genres;
};

const generateActors = () => {
  const actors = new Set();
  const maxActors = getRandomInteger(1, Actors.length);
  for (let i = 0; i < maxActors; i++) {
    const index = getRandomInteger(0, Actors.length - 1);
    actors.add(Actors[index]);
  }
  return actors;
};

const generateWriters = () => {
  const writers = new Set();
  const maxWriters = getRandomInteger(1, Writers.length);
  for (let i = 0; i < maxWriters; i++) {
    const index = getRandomInteger(0, Writers.length - 1);
    writers.add(Writers[index]);
  }
  return writers;
};

const generateDurations = (duration) => {
  const hour = getRandomInteger(duration.MIN_HOUR, duration.MAX_HOUR);
  const minutes = getRandomInteger(duration.MIN_MINUTES, duration.MAX_MINUTES);
  return `${hour}h ${minutes}m`;
};

const generateAgeRaitng = () => {
  return `${getRandomInteger(Age.MIN, Age.MAX)}+`;
};

const generateComments = () => {
  const commentCount = getRandomInteger(CommentCount.MIN, CommentCount.MAX);
  const commetns = [];
  for (let i = 0; i < commentCount; i++) {
    commetns.push(generateComment());    
  }
  return commetns;
};

const generateFilm = () => {
  return {
    title: generateTitle(),
    originalTitle: generateTitle(),
    poster: generatePosterURL(),
    description: generateDescription(),
    comments: generateComments(),
    rating: generateRating(),
    release: generateReleaseDate(new Date(1900, 1, 1), new Date()),
    genres: Array.from(generateGenres()),
    duration: generateDurations(filmDuration),
    country: Countries[getRandomInteger(0, Countries.length - 1)],
    ageRating: generateAgeRaitng(),
    director: Directors[getRandomInteger(0, Directors.length - 1)],
    actors: Array.from(generateActors()),
    writers: Array.from(generateWriters()),
    inWatchlist: !!(Math.random() < 0.5),
    isWatched: !!(Math.random() < 0.5),
    isFavorite: !!(Math.random() < 0.5)
  };
};

export {generateFilm};
