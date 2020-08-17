import AbstractView from "./abstract.js";

class ExtraFilmsList extends AbstractView {
  getTemplate() {
    return `<section class="films-list--extra">              
              <div class="films-list__container"></div>            
            </section>`;
  }
}

export default ExtraFilmsList;
