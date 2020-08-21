import SmartView from "./smart.js";

class NewComment extends SmartView {
  constructor(film) {
    super();
    this._data = film;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    const {emoji} = this._data;
    const emojiTemplate = emoji ? `<img src="images/emoji/${emoji.slice(emoji.indexOf(`-`) + 1)}.png" width="55" height="55" alt="emoji-smile"></img>` : ``;
    return `<div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${emojiTemplate}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._emojiClickHandler);
  }

  _emojiClickHandler(evt) {
    if (evt.target.tagName === `IMG`) {
      evt.preventDefault();
      const parent = evt.target.parentElement;
      const emojyName = parent.htmlFor;
      this.updateData({
        emoji: emojyName
      });
    }
  }
}

export default NewComment;
