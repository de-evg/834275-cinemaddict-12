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

const GenresCount = {
  MIN: 1,
  MAX: 3
};

const SortType = {
  DEFAULT: `default`,
  RELEASE: `release`,
  RATING: `rating`
};

const Controls = {
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

const DescritptionRange = {
  MIN: 0,
  MAX: 139
};

const UserAction = {
  ADD_TO_WATCHLIST: `ADD_TO_WATCHLIST`,
  ADD_TO_WATCHED: `ADD_TO_WATCHED`,
  ADD_TO_FAVORITES: `ADD_TO_FAVORITES`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const Emoji = {
  [`EMOJI-ANGRY`]: `angry`,
  [`EMOJI-PUKE`]: `puke`,
  [`EMOJI-SLEEPING`]: `sleeping`,
  [`EMOJI-SMILE`]: `smile`,
};

export {DescritptionRange, DescCount, CommentCount, Year, GenresCount, SortType, Controls, UserAction, UpdateType, FilterType, Emoji};
