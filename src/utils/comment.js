import moment from "moment";

const checkOnLeadingZero = (someDate) => {
  return someDate < 10 ? `0${someDate}` : someDate;
};

const formatCommentDate = (date) => {
  const year = date.getFullYear();
  const month = checkOnLeadingZero(date.getMonth() + 1);
  const day = checkOnLeadingZero(date.getDay() + 1);
  const hours = checkOnLeadingZero(date.getHours());
  const minutes = checkOnLeadingZero(date.getMinutes());
  return moment(`${year}${month}${day} ${hours}${minutes}`).format(`YYYY/MM/DD H:mm`);
};

export {formatCommentDate};
