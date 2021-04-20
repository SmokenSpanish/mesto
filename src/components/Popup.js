export default class Popup {
   
    constructor(popupSelector) {
        this._popupEl = document.querySelector(popupSelector);
        this._closePopupButton = this._popupEl.querySelector('.popup__close-button');
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        
    }

    open() {
        this._popupEl.classList.add('popup_opened');
        this._popupEl.addEventListener('pointerdown', this._handleEscClose)
        this._popupEl.addEventListener('click', this._handleOverlayClose)
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupEl.classList.remove('popup_opened');
        this._popupEl.removeEventListener("pointerdown", this._handleEscClose);
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        evt.target === this._popupEl
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        evt.target === this._popupEl
        if (!evt.target.closest('.popup__overlay')){
            this.close();
        }
    }

    setEventListeners() {
        this._closePopupButton.addEventListener('click', this.close);
    }
}