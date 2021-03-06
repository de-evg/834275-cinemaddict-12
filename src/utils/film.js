import moment from "moment";

const formatReleaseDate = (date, isFullDate) => {
  return isFullDate ? moment(date).format(`DD MMMM YYYY`) : moment(date).format(`YYYY`);
};

const formatDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  let minutes = duration % 60;
  minutes = minutes > 10 ? minutes : `0${minutes}`;
  const time = moment(`${hours}${minutes}`, `hmm`).format(`H:mm`);
  const times = time.split(`:`);
  const result = times.reduce((foramtedTime, value) => {
    const format = foramtedTime.length
      ? `m`
      : `h `;
    foramtedTime = `${foramtedTime}${value}${format}`;
    return foramtedTime;
  }, ``);

  return result;
};

export {formatReleaseDate, formatDuration};
