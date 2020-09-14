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
  CLOSE_POPUP: `CLOSE_POPUP`,
  CHANGE_CONTROL: `CHANGE_CONTROL`,
  CHANGE_POPUP_CONTROL: `CHANGE_POPUP_CONTROL`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`
};

const UpdateType = {
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

const Emoji = {
  [`EMOJI-ANGRY`]: `angry`,
  [`EMOJI-PUKE`]: `puke`,
  [`EMOJI-SLEEPING`]: `sleeping`,
  [`EMOJI-SMILE`]: `smile`,
};

const Socket = {
  AUTHORIZATION: `Basic aS2dfgSfer3fbrb3fw`,
  END_POINT: `https://12.ecmascript.pages.academy/cinemaddict`
};

const ExtraFilmsType = {
  TOP_RATED: `TOP_RATED`,
  MOST_COMMENTED: `MOST_COMMENTED`
};

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`
};

export {SortType, Controls, DescritptionRange, UserAction, UpdateType, FilterType, StatisticFilterType, Emoji, Socket, ExtraFilmsType, Mode};
