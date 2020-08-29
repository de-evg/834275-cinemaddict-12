import SmartView from "./smart.js";
import {Emoji} from "../const.js";

const generateId = () => Date.now() + parseInt(Math.random() * 1000, 10);

class NewComment extends SmartView {
  constructor(comment) {
    super();
    this._data = NewComment.parseCommentToData(comment);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentDetailsChangeHandler = this._commentDetailsChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    const {emoji, comentDetails} = this._data;
    const emojiTemplate = emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile"></img>` : ``;
    return `<div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${emojiTemplate}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comentDetails}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emoji === `emoji-smile` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emoji === `emoji-sleeping` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emoji === `emoji-puke` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emoji === `emoji-angry` ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>`;
  }
  restoreHandlers() {
    this._setInnerHandlers();
  }

  getComment() {
    return NewComment.parseDataToComment({
      id: generateId(),
      author: `User`,
      message: this.getElement().querySelector(`.film-details__comment-input`).value,
      date: (new Date().getTime()),
      emoji: this._data.emoji
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emojiClickHandler);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`change`, this._commentDetailsChangeHandler);
  }

  _commentDetailsChangeHandler(evt) {
    evt.preventDefault();
    const newComentDetails = evt.target.value;
    this.updateData({
      comentDetails: newComentDetails
    });
  }

  _emojiClickHandler(evt) {
    if (evt.target.tagName === `IMG`) {
      evt.preventDefault();
      const parent = evt.target.parentElement;
      const emojyName = parent.htmlFor.toUpperCase();
      this.updateData({
        emoji: Emoji[emojyName]
      });
    }
  }

  static parseCommentToData(comment) {
    return Object.assign(
        {},
        comment
    );
  }

  static parseDataToComment(comment) {
    return Object.assign(
        {},
        comment);
  }
}

export default NewComment;

