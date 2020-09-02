import Observer from "../utils/observer.js";

class Comment extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  addComment(actionType, update) {
    this._comments.push(update);
    this._notify(actionType, update);
  }

  deleteComment(actionType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(actionType, update);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          emoji: comment.emotion
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

    return adaptedComment;
  }
}

export default Comment;
