import {openPopup} from "./script.js"
import {popupPic, popupImageTitle, popupImage} from "./Utils.js"

export default class Card {
    constructor(link, name, cardSelector) {
        this._image = link;
        this._caption = name;
        this._cardSelector = cardSelector; 
    }

        _composeItem() {
            const newItem = document.querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true);
            return newItem;
        }

        generateCard() {
            this._element = this._composeItem();
            this._setEventListeners();
            this._element.querySelector('.element__image').src = this._image;
            this._element.querySelector('.element__title').textContent = this._caption;  
            return this._element;
            
        }

        _setEventListeners() {
            this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleDelete()
        });
            this._element.querySelector('.element__rectangle').addEventListener('click', () => {
                this._likeActive()
            });
            this._element.querySelector('.element__image').addEventListener('click', () => {
                this._clickImage()
            });
        }

        _handleDelete() {
            this._element.remove();
            this._element = null;
        }

        _likeActive() {
            this._element.querySelector('.element__rectangle').classList.toggle('element__rectangle_active');
        }

        _clickImage() {
            popupPic.src = this._image;
            popupPic.alt = this._caption;
            popupImageTitle.textContent = this._caption;
            openPopup(popupImage);
        }
}
