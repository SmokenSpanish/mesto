import PopupWithForm from "./PopupWithForm.js";

export default class PopupWithConfirn extends PopupWithForm {
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._res();
      this.close();
    });
  }

  close() {
    // this._rej();
    super.close();
  }

  open(res, rej) {
    this._res = res;
    this._rej = rej;
    super.open();
  }
}