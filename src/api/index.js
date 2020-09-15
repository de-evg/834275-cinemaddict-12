import FilmsModel from "../model/films.js";
import CommentsModel from "../model/comments.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
  OPTIONS: `OPTIONS`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `/movies`})
      .then(Api.toJSON)
      .then((films) => films
        .map(FilmsModel.adaptToClient))
      .catch((err) => {
        throw new Error(err);
      });
  }

  getComments(filmID) {
    return this._load({url: `/comments/${filmID}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient))
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateFilm(film) {
    return this._load({
      url: `/movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient)
      .catch((err) => {
        throw new Error(err);
      });
  }

  addComment(comment) {
    const filmID = comment.filmID;
    return this._load({
      url: `/comments/${filmID}`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then((response) => {
        const {movie, comments} = response;
        const updatedFilm = FilmsModel.adaptToClient(movie);
        const updatedComments = comments.map(CommentsModel.adaptToClient);
        return {updatedFilm, updatedComments};
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  deleteComment(commentID) {
    return this._load({
      url: `/comments/${commentID}`,
      method: Method.DELETE
    });
  }

  sync(films) {
    return this._load({
      url: `/movies/sync`,
      method: Method.POST,
      body: JSON.stringify(films),
      headers: new Headers({"Content-Type": `application\json`})
    })
    .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.set(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}${url}`, {
      method,
      body,
      headers
    })
      .then(Api.checkStatus)
      .catch((error) => {
        throw error;
      });
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

export default Api;
