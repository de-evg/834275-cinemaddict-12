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

class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }
    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms
      .map(FilmsModel.adaptToClient)
      .map(FilmsModel.adaptToOffline));
  }

  updateFilm(film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(film)
      .then((updatedFilm) => {
        this._store.setItem(updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
        return updatedFilm;
      });
    }
    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(
        FilmsModel.adaptToOffline(
            FilmsModel.adaptToClient(film)
        )
    );
  }

  getComments(filmID) {
    if (Provider.isOnline()) {
      return this._api.getComments(filmID)
        .then((comments) => {
          return comments;
        });
    }

    return Promise.reject([]);
  }

  addComment(newComment) {
    if (Provider.isOnline()) {
      return this._api.addComment(newComment)
        .then((response) => {
          return response;
        });
    }

    return Promise.reject([]);
  }

  deleteComment(filmID) {
    if (Provider.isOnline()) {
      return this._api.deleteComment(filmID);
    }
    return Promise.reject([]);
  }

  sync() {
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = getSyncedFilms(response.updated);

          const items = createStoreStructure([...updatedFilms]);

          this._store.setItems(items);
        });
    }
    return Promise.reject(new Error(`Sync data faied`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}

export default Provider;
