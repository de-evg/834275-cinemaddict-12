import Observer from "../utils/observer.js";

class Comment extends Observer {
  constructor() {
    super();
    this._comments = {};
    this._newComment = {
      currentEmoji: ``,
      currentComment: ``
    };
  }

  getComments(filmID) {
    return this._comments[filmID];
  }

  getNewComment() {
    return this._newComment;
  }

  setNewComment(update) {
    this._newComment = Object.assign(
        {},
        this._newComment,
        update
    );
  }

  resetNewComment() {
    this._newComment = {
      currentEmoji: ``,
      currentComment: ``
    };
  }

  setComments(filmID, comments) {
    this._comments[filmID] = comments;
    this._notify();
  }

  addComment(filmID, update) {
    this._comments[filmID].push(update);
  }

  deleteComment(film, update) {
    let comments = this._comments[film.id];
    const index = comments.findIndex((comment) => comment.id === update);

    if (index === -1) {
      throw new Error(`Can't update unexisting comment`);
    }

    comments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          emoji: comment.emotion,
        }
    );

    delete adaptedComment.emotion;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {

          emotion: comment.currentEmoji,
          comment: comment.currentComment,

        }
    );

    delete adaptedComment.emoji;
    delete adaptedComment.filmID;
    delete adaptedComment.currentEmoji;
    delete adaptedComment.currentComment;
    return adaptedComment;

  }
}

export default Comment;
