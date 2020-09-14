import FilmsModel from "../model/films.js";

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const Key = {
  ALL_FILMS: `allFilms`,
  UPDATE: `update`
};

class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSyncNeeded = false;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms(Key.ALL_FILMS)
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items, Key.ALL_FILMS);
          return films;
        });
    }
    const storeFilms = Object.values(this._store.getItems(Key.ALL_FILMS));

    return Promise.resolve(storeFilms
      .map(FilmsModel.adaptToClient)
      .map(FilmsModel.adaptToOffline));
  }

  updateFilm(film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(film)
      .then((updatedFilm) => {
        this._store.setItem(Key.ALL_FILMS, updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
        return updatedFilm;
      });
    }
    this._isSyncNeeded = true;
    this._store.setItem(Key.UPDATE, film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(FilmsModel.adaptToOffline(film));
  }

  getComments(filmID) {
    if (Provider.isOnline()) {
      return this._api.getComments(filmID)
        .then((comments) => {
          return comments;
        });
    }

    return Promise.reject();
  }

  addComment(newComment) {
    if (Provider.isOnline()) {
      return this._api.addComment(newComment)
        .then((response) => {
          return response;
        });
    }

    return Promise.reject();
  }

  deleteComment(filmID) {
    if (Provider.isOnline()) {
      return this._api.deleteComment(filmID);
    }
    return Promise.reject();
  }

  sync() {
    if (Provider.isOnline() && this._isSyncNeeded) {
      const storeFilms = {
        movies: Object.values(this._store.getItems(Key.ALL_FILMS))
      };

      return this._api.sync(storeFilms)
        .then((response) => {
          this._isUpdateNeeded = false;
          const updatedFilms = getSyncedFilms(response.updated);

          const items = createStoreStructure([...updatedFilms]);

          this._store.setItems(items);
        });
    }
    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}

export default Provider;
