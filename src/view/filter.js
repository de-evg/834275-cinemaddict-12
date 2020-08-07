const crateFilterItemTemplate = (filterName, count) => {
  const title = `${filterName[0].toUpperCase()}${filterName.slice(1)}`;
  return `<a href="#${filterName}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilterTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter) => crateFilterItemTemplate(filter.name, filter.count))
    .join(``);
  return (
    `<nav class="main-navigation">
              <div class="main-navigation__items">
                  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
                  ${filterItemsTemplate}
              </div>
              <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`
  );
};

export {createFilterTemplate};
