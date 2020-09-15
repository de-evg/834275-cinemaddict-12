import AbstractView from "./abstract.js";

class FilmList extends AbstractView {
  getTemplate() {
    return `<section class="films-list">              
              <div class="films-list__container"></div>            
            </section>`;
  }
}

export default FilmList;
