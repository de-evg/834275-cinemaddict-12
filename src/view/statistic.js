import AbstractView from "./abstract.js";

class Statistic extends AbstractView {
  getTemplate() {
    return `<section class="statistic"></section>`;
  }
}

export default Statistic;
