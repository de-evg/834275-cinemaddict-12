import moment from "moment";

const formatCommentDate = (date) => {
  const updatedDate = new Date(date);
  moment.defaultFormat = `YYYY/MM/DD H:mm`;
  return moment(updatedDate).fromNow();
};

export {formatCommentDate};
