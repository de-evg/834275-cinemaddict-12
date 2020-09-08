import AbstractView from "./abstract.js";

class FilmsContainer extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}

export default FilmsContainer;
