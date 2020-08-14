import AbstractView from "./abstract.js";

class LoadingFilms extends AbstractView {
  getTemplate() {
    return `<h2 class="films-list__title">Loading...</h2>`;
  }
}

export default LoadingFilms;
