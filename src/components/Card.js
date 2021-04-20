export default class Card {
    constructor(data, handleCardClick, cardSelector) {
        this._image = data.link;
        this._caption = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick
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
        this._element.querySelector('.element__title').alt = this._caption;
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
            this._handleCardClick(this._image, this._caption)
        })
    }

    _handleDelete() {
        this._element.remove();
        this._element = null;
    }

    _likeActive() {
        this._element.querySelector('.element__rectangle').classList.toggle('element__rectangle_active');
    }

}
