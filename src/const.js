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
  LIST: `list`,
  WATCHED: `watched`,
  FAVORITE: `favorite`
};

const DescritptionRange = {
  MIN: 0,
  MAX: 139
};

const UserAction = {
  SHOW_POPUP: `SHOW_POPUP`,
  CLOSE_POPUP: `CLOSE_POPUP`,
  CHANGE_CONTROL: `CHANGE_CONTROL`,
  CHANGE_POPUP_CONTROL: `CHANGE_POPUP_CONTROL`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`
};

const StatisticFilterType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const MenuItem = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATISTIC: `stats`
};

const Emoji = {
  [`EMOJI-ANGRY`]: `angry`,
  [`EMOJI-PUKE`]: `puke`,
  [`EMOJI-SLEEPING`]: `sleeping`,
  [`EMOJI-SMILE`]: `smile`,
};

const Socket = {
  AUTHORIZATION: `Basic aS2dfgSfer3fbrb3fw`,
  END_POINT: `https://12.ecmascript.pages.academy/cinemaddict/`
};

const ExtraFilmsType = {
  TOP_RATED: `TOP_RATED`,
  MOST_COMMENTED: `MOST_COMMENTED`
};

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`
};

export {Mode, MenuItem, DescritptionRange, DescCount, CommentCount, Year, GenresCount, SortType, Controls, UserAction, UpdateType, FilterType, Emoji, StatisticFilterType, Socket, ExtraFilmsType};
