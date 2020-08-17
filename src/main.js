import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import BoardView from "./view/board.js";
import ExtraFilmsListView from "./view/extra-films-list.js";
import TopRatedListTitleView from "./view/top-rated-list-title.js";
import MostCommentedListTitleView from "./view/most-commented-list-title.js";
import FilmView from "./view/film";
import StatisticView from "./view/statistic.js";
import UserRankView from "./view/user-rank.js";
import StatisticFiltersView from "./view/statistic-filters.js";
import StaticticContentView from "./view/statistic-content.js";
import StatisticChartView from "./view/statistic-chart.js";
import FilmsCountView from "./view/films-count.js";
import FilmPopupView from "./view/film-popup.js";
import MainMovieListPresenter from "./presenter/MovieList.js";
import {generateFilter} from "./mock/filter.js";
import {generateFilm} from "./mock/film.js";
import {generateProfileRang} from "./mock/user-profile.js";
import {generateStaistic} from "./mock/statistic.js";
import {render, RenderPosition, insert, remove} from "./utils/render.js";

const ALL_FILMS_COUNT = 23;
const EXTRA_FILMS_STEP = 2;
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

const films = new Array(ALL_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const sortedFilmsBy = {
  default: films.slice(),
  rating: films
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .filter((film) => film.rating),
  comments: films
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .filter((film) => film.comments.length)
};
const profileRang = generateProfileRang();

const renderFilms = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const filmPopupComponent = new FilmPopupView(film);

  const showPopupComponent = () => {
    insert(siteBodyElement, filmPopupComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closePopupComponent = () => {
    remove(filmPopupComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopupComponent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.setClickHandler(showPopupComponent);
  filmPopupComponent.setBtnCloseClickHandler(closePopupComponent);

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderExtraFilmList = (listTitleElement, boardFilms) => {
  if (boardFilms.length) {
    const extraFilmsListComponent = new ExtraFilmsListView();
    render(boardComponent, extraFilmsListComponent, RenderPosition.BEFOREEND);
    render(extraFilmsListComponent, listTitleElement, RenderPosition.AFTERBEGIN);

    const filmListContainerElement = extraFilmsListComponent.getElement().querySelector(`.films-list__container`);
    boardFilms.splice(0, EXTRA_FILMS_STEP).forEach((film) => {
      renderFilms(filmListContainerElement, film);
    });
  }
};

render(siteHeaderElement, new UserProfileView(profileRang), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const mainMovieListPresenter = new MainMovieListPresenter(boardComponent);
mainMovieListPresenter.init(sortedFilmsBy.default);
renderExtraFilmList(new TopRatedListTitleView(), sortedFilmsBy.rating);
renderExtraFilmList(new MostCommentedListTitleView(), sortedFilmsBy.comments);

const statisticComponent = new StatisticView();
render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);

const statistic = generateStaistic(films);
render(statisticComponent, new UserRankView(statistic.rank), RenderPosition.BEFOREEND);
render(statisticComponent, new StatisticFiltersView(), RenderPosition.BEFOREEND);
render(statisticComponent, new StaticticContentView(statistic), RenderPosition.BEFOREEND);
render(statisticComponent, new StatisticChartView(), RenderPosition.BEFOREEND);

render(footerStatisticElement, new FilmsCountView(films.length), RenderPosition.BEFOREEND);
