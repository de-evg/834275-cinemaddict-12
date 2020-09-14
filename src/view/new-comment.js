import SmartView from "./smart.js";
import {Emoji} from "../const.js";

const generateId = () => Date.now() + parseInt(Math.random() * 1000, 10);

class NewComment extends SmartView {
  constructor(commentModel, film) {
    super();
    this._commentModel = commentModel;
    this._film = film;
    this._data = NewComment.parseCommentToData(this._commentModel.getNewComment());
    this._data.isFormDisabled = false;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentMessageChangeHandler = this._commentMessageChangeHandler.bind(this);
    this.disableForm = this.disableForm.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    const emojiTemplate = this._data.currentEmoji ? `<img src="images/emoji/${this._data.currentEmoji}.png" width="55" height="55" alt="emoji-${this._data.currentEmoji}"></img>` : ``;
    return `<div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${emojiTemplate}</div>

              <label class="film-details__comment-label">
                <textarea 
                  class="film-details__comment-input" 
                  placeholder="Select reaction below and write comment here" 
                  name="comment" 
                  ${this._data.isFormDisabled ? `disabled` : ``}>${this._data.currentComment}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input 
                  class="film-details__emoji-item visually-hidden" 
                  name="comment-emoji" 
                  type="radio" 
                  id="emoji-smile" 
                  value="smile" 
                  ${this._data.currentEmoji === Emoji[`EMOJI-SMILE`] ? `checked` : ``}
                  ${this._data.isFormDisabled ? `disabled` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input 
                  class="film-details__emoji-item visually-hidden" 
                  name="comment-emoji" 
                  type="radio" 
                  id="emoji-sleeping" 
                  value="sleeping" 
                  ${this._data.currentEmoji === Emoji[`EMOJI-SLEEPING`] ? `checked` : ``}
                  ${this._data.isFormDisabled ? `disabled` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input 
                  class="film-details__emoji-item visually-hidden" 
                  name="comment-emoji" 
                  type="radio" 
                  id="emoji-puke" 
                  value="puke" 
                  ${this._data.currentEmoji === Emoji[`EMOJI-PUKE`] ? `checked` : ``}
                  ${this._data.isFormDisabled ? `disabled` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input 
                  class="film-details__emoji-item visually-hidden" 
                  name="comment-emoji" 
                  type="radio" 
                  id="emoji-angry" 
                  value="angry" 
                  ${this._data.currentEmoji === Emoji[`EMOJI-ANGRY`] ? `checked` : ``}
                  ${this._data.isFormDisabled ? `disabled` : ``}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>`;
  }
  restoreHandlers() {
    this._setInnerHandlers();
  }

  disableForm() {
    this.updateData({
      isFormDisabled: true
    }, true);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emojiClickHandler);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentMessageChangeHandler);
  }

  _commentMessageChangeHandler(evt) {
    evt.preventDefault();
    const newCommentText = evt.target.value;
    this.updateData({
      currentComment: newCommentText
    }, true);
    this._commentModel.setNewComment({
      currentComment: newCommentText,
      filmID: this._film.id,
      id: generateId().toString()
    });
  }

  _emojiClickHandler(evt) {
    if (evt.target.tagName === `IMG` && !this._data.isFormDisabled) {
      evt.preventDefault();
      const parent = evt.target.parentElement;
      const emojyName = parent.htmlFor.toUpperCase();
      this.updateData({
        currentEmoji: Emoji[emojyName]
      });
      this._commentModel.setNewComment({
        currentEmoji: Emoji[emojyName]
      });
    }
  }

  static parseCommentToData(comment) {
    return Object.assign(
        {},
        comment
    );
  }
}

export default NewComment;

