import moment from "moment";

const formatCommentDate = (date) => {
  const updatedDate = new Date(date);
  return moment(updatedDate).fromNow();
};

export {formatCommentDate};
