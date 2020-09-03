import moment from "moment";
import Observer from "../utils/observer.js";

class Comment extends Observer {
  constructor() {
    super();
    this._comments = new Map();
    this._newComment = {
      currentEmoji: ``,
      currentComment: ``
    };
  }

  getComments(filmID) {
    return this._comments.get(filmID);
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
    this._comments.set(filmID, comments);
    this._notify();
  }

  addComment(actionType, filmID, update) {
    this._comments.set(filmID, update);
  }

  deleteComment(actionType, filmID, update) {
    let comments = this._comments.get(filmID);
    const index = comments.findIndex((comment) => comment.id === update);

    if (index === -1) {
      throw new Error(`Can't update unexisting comment`);
    }

    comments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];

    this.setComments(filmID, comments);
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
          emotion: comment.emoji
        }
    );

    delete adaptedComment.emoji;
    delete adaptedComment.filmID;
    return adaptedComment;

  }
}

export default Comment;
