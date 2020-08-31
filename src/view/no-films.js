import AbstractView from "./abstract.js";

class NoFilms extends AbstractView {
  getTemplate() {
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }
}

export default NoFilms;
