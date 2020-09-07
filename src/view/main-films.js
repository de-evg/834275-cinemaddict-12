import AbstractView from "./abstract.js";

class MainFilms extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}

export default MainFilms;
