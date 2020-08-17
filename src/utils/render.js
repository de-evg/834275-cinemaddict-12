import Abstract from "../view/abstract.js";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const insert = (container, element) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.appendChild(element);
};

const remove = (component) => {
  if (component instanceof Abstract) {
    component.getElement().remove();
    component.removeElement();
  } else {
    throw new Error(`Can remove only components`);
  }
};

export {RenderPosition, render, renderTemplate, createElement, insert, remove};