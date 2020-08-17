import AbstractView from "./abstract.js";

class Board extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}

export default Board;
