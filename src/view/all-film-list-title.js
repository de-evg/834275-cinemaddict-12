import AbstractView from "./abstract.js";

class AllFilmListTitle extends AbstractView {
  getTemplate() {
    return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
  }
}

export default AllFilmListTitle;
