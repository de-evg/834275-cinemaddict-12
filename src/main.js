import UserProfileView from "./view/user-profile.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import BoardView from "./view/board.js";
import FilmListView from "./view/films-list.js";
import ExtraFilmsListView from "./view/extra-films-list.js";
import AllFilmsListTitleView from "./view/all-film-list-title.js";
import TopRatedListTitleView from "./view/top-rated-list-title.js";
import MostCommentedListTitleView from "./view/most-commented-list-title.js";
import NoDataView from "./view/no-data.js";
import LoadMoreBtnView from "./view/load-more-btn.js";
import LoadingFilmsView from "./view/loading-films.js";
import FilmView from "./view/film";
import StatisticView from "./view/statistic.js";
import UserRankView from "./view/user-rank.js";
import StatisticFiltersView from "./view/statistic-filters.js";
import StaticticContentView from "./view/statistic-content.js";
import StatisticChartView from "./view/statistic-chart.js";
import FilmsCountView from "./view/films-count.js";
import FilmPopupView from "./view/film-popup.js";
import {generateFilm} from "./mock/film.js";
import {generateProfileRang} from "./mock/user-profile.js";
import {generateFilter} from "./mock/filter.js";
import {generateStaistic} from "./mock/statistic.js";
import {render, RenderPosition, insert, remove} from "./utils/render.js";

const ALL_FILMS_COUNT = 23;
const ALL_FILMS_STEP = 5;
const EXTRA_FILMS_STEP = 2;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);
const footerStatisticElement = siteFooterElement.querySelector(`.footer__statistics`);

const films = new Array(ALL_FILMS_COUNT).fill().map(generateFilm);
const sortedFilmsBy = {
  all: films.slice(),
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
const filters = generateFilter(films);

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

const renderMainFilmList = (boardFilms) => {
  const allFilmsListComponent = new FilmListView();
  render(boardComponent, allFilmsListComponent, RenderPosition.BEFOREEND);
  if (boardFilms.length) {
    render(allFilmsListComponent, new AllFilmsListTitleView(), RenderPosition.AFTERBEGIN);
    const allFilmsListContainerElement = allFilmsListComponent.getElement().querySelector(`.films-list__container`);
    const loadingFilmsComponent = new LoadingFilmsView();
    render(allFilmsListComponent, loadingFilmsComponent, RenderPosition.AFTERBEGIN);
    boardFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
      renderFilms(allFilmsListContainerElement, film);
    });
    loadingFilmsComponent.getElement().remove();
    const loadMoreBtnComponent = new LoadMoreBtnView();    
    loadMoreBtnComponent.setClickHandler(() => {
      render(allFilmsListComponent, loadingFilmsComponent, RenderPosition.AFTERBEGIN);
      boardFilms.splice(0, ALL_FILMS_STEP).forEach((film) => {
        render(allFilmsListContainerElement, new FilmView(film), RenderPosition.BEFOREEND);
      });
      loadingFilmsComponent.getElement().remove();
      if (!boardFilms.length) {
        remove(loadMoreBtnComponent);
      }
    });
    render(allFilmsListComponent, loadMoreBtnComponent, RenderPosition.BEFOREEND);
  } else {
    render(allFilmsListComponent, new NoDataView(), RenderPosition.AFTERBEGIN);
  }
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

renderMainFilmList(sortedFilmsBy.all);
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
