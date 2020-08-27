import CommentView from "../view/comment.js";
import {RenderPosition, render} from "../utils/render.js";

class Comment {
  constructor(commentContainer) {
    this._commentContainer = commentContainer;
  }

  init(comment) {
    this._commentComponent = new CommentView(comment);
    this._renderComment(comment);
  }

  _renderComment() {
    render(this._commentContainer, this._commentComponent, RenderPosition.BEFOREEND);
  }
}

export default Comment;
