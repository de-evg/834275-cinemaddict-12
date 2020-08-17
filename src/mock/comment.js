import {getRandomInteger} from "../utils/common.js";

const authors = [
  `Tim Macoveev`, `Brad Pitt`, `Angelina Jolie`, `Leonardo DiKaprio`
];

const messages = [
  `Interesting setting and a good cast`, `Booooooring`, `Very nice!`, `LoL`, `I'm the BEST of the BEST!`
];

const generateDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const checkOnLeadingZero = (someDate) => {
    return someDate < 10 ? `0${someDate}` : someDate;
  };
  const year = date.getFullYear();
  const month = checkOnLeadingZero(date.getMonth() + 1);
  const day = checkOnLeadingZero(date.getDay() + 1);
  const hours = checkOnLeadingZero(date.getHours());
  const minutes = checkOnLeadingZero(date.getMinutes());
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const generateComment = () => {
  return {
    author: authors[getRandomInteger(0, authors.length - 1)],
    message: messages[getRandomInteger(0, messages.length - 1)],
    date: generateDate(new Date(1900, 1, 1), new Date())
  };
};

export {generateComment};
