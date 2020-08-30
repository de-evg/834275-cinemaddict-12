import {getRandomInteger} from "../utils/common.js";
import {Emoji} from "../const.js";

const authors = [
  `Tim Macoveev`, `Brad Pitt`, `Angelina Jolie`, `Leonardo DiKaprio`
];

const messages = [
  `Interesting setting and a good cast`, `Booooooring`, `Very nice!`, `LoL`, `I'm the BEST of the BEST!`
];

const generateDate = (start, end) => {
  const date = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return date;
};

const generateId = () => Date.now() + parseInt(Math.random() * 1000, 10);

const generateEmoji = () => {
  const emojies = Object.values(Emoji);
  return emojies[getRandomInteger(0, emojies.length - 1)];
};

const generateComment = () => {
  return {
    id: generateId(),
    author: authors[getRandomInteger(0, authors.length - 1)],
    message: messages[getRandomInteger(0, messages.length - 1)],
    date: generateDate(new Date(1900, 1, 1), new Date()),
    emoji: generateEmoji()
  };
};

export {generateComment};
