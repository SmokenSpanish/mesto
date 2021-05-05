export default class Card {
    constructor(card, currentUser, cardSelector, handleCardClick, { handleToggleLike }, { handleDeleteCard }) {
        this._card = card;
        this._name = card.name;
        this._link = card.link;
        this._handleCardClick = handleCardClick
        this._cardSelector = cardSelector;
        this._toggleLike = handleToggleLike;
        this._currentUser = currentUser;
        this._isMyCard = card.owner._id === currentUser._id;
        this._deleteCard = handleDeleteCard;
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
        this._element.querySelector('.element__title').textContent = this._name;
        this._likesCountEl = this._element.querySelector(".element__like-count");
        this._setLikesCount(this._card.likes.length);
        this._checkMyLike(this._card.likes);

        this._imgEl.src = this._link;
        this._imgEl.alt = this._name;
        
        return this._element;

    }

    _handleToggleLike() {
        if (!this._likeButton.classList.contains('element__rectangle_active')) {
            this._toggleLike('PUT', this._card._id)
            .then((card) => {
                this._setLikesCount(card.likes.length);
                this._checkMyLike(card.likes);
            })
            .catch((err) => {
                console.log('Ошибка добавления лайка', err)
            });
        } else {
            this._toggleLike('DELETE', this._card._id)
            .then((card) => {
                this._setLikesCount(card.likes.length);
                this._checkMyLike(card.likes);
            })
            .catch((err) => {
                console.log('Ошибка удаления лайка', err);
              });
        }
    }

    _handleDeleteCard() {
        this._deleteCard(this._card._id, this._element);
      }

    _setLikesCount(count) {
        this._likesCountEl.textContent = count;
      }

      _checkMyLike(likes) {
        const myLike = (el) => el._id === this._currentUser._id;
        if (likes.some(myLike)) {
          this._likeButton.classList.add('element__rectangle_active');
        } else {
          this._likeButton.classList.remove('element__rectangle_active');
        }
      }

    _setEventListeners() {
        this._removeButton = this._element.querySelector('.element__trash');
        this._likeButton = this._element.querySelector('.element__rectangle');
        this._imgEl = this._element.querySelector('.element__image');

        if (this._isMyCard) {
            this._removeButton.addEventListener("click", () => this._handleDeleteCard());
          } else {
            this._removeButton.remove();
          }

        this._likeButton.addEventListener('click', () => this._handleToggleLike());
        
        this._imgEl.addEventListener('click', this._handleCardClick);
    }
}
