import Observer from "../utils/observer.js";

class Film extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = films.slice();
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
}

export default Film;
