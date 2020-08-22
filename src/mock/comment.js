import moment from "moment";
import {getRandomInteger} from "../utils/common.js";

const authors = [
  `Tim Macoveev`, `Brad Pitt`, `Angelina Jolie`, `Leonardo DiKaprio`
];

const messages = [
  `Interesting setting and a good cast`, `Booooooring`, `Very nice!`, `LoL`, `I'm the BEST of the BEST!`
];

const generateDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date;
};

const generateComment = () => {
  return {
    author: authors[getRandomInteger(0, authors.length - 1)],
    message: messages[getRandomInteger(0, messages.length - 1)],
    date: generateDate(new Date(1900, 1, 1), new Date())
  };
};

export {generateComment};
