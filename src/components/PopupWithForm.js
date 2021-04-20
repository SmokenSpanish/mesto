import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupEl.querySelector(".popup__forms");
        this._inputList = this._form.querySelectorAll(".popup__input");
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(element => {
            inputValues[element.name] = element.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}