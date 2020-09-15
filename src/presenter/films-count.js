import FilmsCountView from "../view/films-count.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

class FilmsCount {
  constructor(statisticContainer, filmsModel) {
    this._statisticContainer = statisticContainer;
    this._filmsModel = filmsModel;

    this._handleFilmsCountUpdate = this._handleFilmsCountUpdate.bind(this);

    this._filmsModel.addObserver(this._handleFilmsCountUpdate);
  }

  init() {
    this._films = this._filmsModel.getFilms();

    this._prevFilmsCountComponent = this._filmsCountComponent;
    this._filmsCountComponent = new FilmsCountView(this._films.length);

    if (!this._prevFilmsCountComponent) {
      this._renderFilmsCount();
      return;
    }

    replace(this._filmsCountComponent, this._prevFilmsCountComponent);

    remove(this._prevFilmsCountComponent);
  }

  _renderFilmsCount() {
    render(this._statisticContainer, this._filmsCountComponent, RenderPosition.BEFOREEND);
  }

  _handleFilmsCountUpdate() {
    this.init();
  }
}

export default FilmsCount;
