const FILMS = [`Harry Potter`, `Terminator 2`, `Interstellar`, `Alien`];
const GANRES = [`Comedy`, `Horror`, `Fantastic`, `Drama`];
const POSTERS_URLS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const DescCount = {
  MIN: 1,
  MAX: 5
};

const CommentCount = {
  MIN: 0,
  MAX: 5
};

const Year = {
  MIN: 1900,
  MAX: 2020
};

const GanresCount = {
  MIN: 1,
  MAX: 3
};

export {FILMS, POSTERS_URLS, DescCount, CommentCount, Year, GANRES, GanresCount};
