const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export default class Card {
    constructor(link, name, cardSelector) {
        this._image = link;
        this._caption = name;
        this._cardSelector = cardSelector;  
    }

        _composeItem() {
            const newItem = document.querySelector('.template')
            .content.querySelector('.element')
            .cloneNode(true);
            return newItem;
        }

        generateCard() {
            this._element = this._composeItem();
            this._setEventListeners();
            this._element.querySelector('.element__image').src = this._image;
            this._element.querySelector('.element__image').alt = this._alt;
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
            this._element.closest('.element').remove();
        }

        _likeActive() {
            this._element.querySelector('.element__rectangle').classList.toggle('element__rectangle_active');
        }

        _clickImage() {
            popupPic.src = this._image;
            popupPic.alt = this._caption;
            popupImageTitle.textContent = this._caption;
            popupActionOpen(popupImage);
        }
}

export {initialCards};