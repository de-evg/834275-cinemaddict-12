import Observer from "../utils/observer.js";
import {Mode} from "../const.js";

class Films extends Observer {
  constructor() {
    super();
    this._films = [];
    this._filmsToUpdate = [];
  }

  getFilms() {
    return this._films;
  }

  getFilmsToUpdate() {
    return this._filmsToUpdate;
  }

  setFilms(actionType, films) {
    this._films = films.slice();

    this._notify(actionType);
  }

  addFilmsToUpdate(filmID) {
    this._filmsToUpdate.push(filmID);
  }

  removeFilmFromToUpdate(update) {
    const index = this._filmsToUpdate.findIndex((id) => id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._filmsToUpdate = [
      ...this._filmsToUpdate.slice(0, index),
      ...this._filmsToUpdate.slice(index + 1)
    ];
  }

  updateFilm(actionType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(actionType, update);
  }

  static adaptToOffline(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          isFormDisabled: true,
        }
    );

    return adaptedFilm;
  }


  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          id: film.id,
          title: film.film_info.title,
          originalTitle: film.film_info.alternative_title,
          poster: film.film_info.poster,
          description: film.film_info.description,
          comments: film.comments,
          rating: film.film_info.total_rating,
          release: film.film_info.release.date,
          genres: film.film_info.genre,
          duration: film.film_info.runtime,
          country: film.film_info.release.release_country,
          ageRating: film.film_info.age_rating,
          director: film.film_info.director,
          actors: film.film_info.actors,
          writers: film.film_info.writers,
          inWatchlist: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date,
          mode: Mode.DEFAULT,
          isFormDisabled: false
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          [`film_info`]: {
            [`title`]: film.title,
            [`age_rating`]: film.ageRating,
            [`alternative_title`]: film.originalTitle,
            [`genre`]: film.genres,
            [`runtime`]: film.duration,
            [`total_rating`]: film.rating,
            [`poster`]: film.poster,
            [`description`]: film.description,
            [`release`]: {
              [`date`]: film.release,
              [`release_country`]: film.country
            },
            [`director`]: film.director,
            [`actors`]: film.actors,
            [`writers`]: film.writers,
          },
          [`comments`]: film.comments,
          [`user_details`]: {
            [`watchlist`]: film.inWatchlist,
            [`already_watched`]: film.isWatched,
            [`watching_date`]: film.watchingDate,
            [`favorite`]: film.isFavorite
          },
          [`comments_data`]: film.commentsData
        }
    );

    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.poster;
    delete adaptedFilm.description;
    delete adaptedFilm.rating;
    delete adaptedFilm.release;
    delete adaptedFilm.genres;
    delete adaptedFilm.duration;
    delete adaptedFilm.country;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.director;
    delete adaptedFilm.actors;
    delete adaptedFilm.writers;
    delete adaptedFilm.inWatchlist;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.watchedDate;
    delete adaptedFilm.mode;
    delete adaptedFilm.isControlsDisabled;
    delete adaptedFilm.isFormDisabled;
    delete adaptedFilm.error;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.commentsData;

    return adaptedFilm;
  }
}

export default Films;
