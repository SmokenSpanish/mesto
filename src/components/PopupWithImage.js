import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popupEl.querySelector('.popup__image');
        this._capture = this._popupEl.querySelector('.popup__image-title');
    }
    
    open(link, name) {
        this._image.src = link;
        this._image.alt = name;
        this._capture.textContent = name;
        super.open();
    }
}