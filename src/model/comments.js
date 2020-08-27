import Observer from "../utils/observer.js";

class Comment extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  addComment(updateType, update) {
    this._comments.push(update);
    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting comment`);
    }

    this._comments = [
      ...this.comments.slice(0, index),
      ...this._comments.slcie(index + 1)
    ];

    this._notify(updateType, update);
  }
}

export default Comment;
