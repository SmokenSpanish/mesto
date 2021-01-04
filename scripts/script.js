const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const popupPlace = document.querySelector('.popup-place');
const popupImage = document.querySelector('.popup-image');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__image-button');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const nameInputProfile = profile.querySelector('.profile__name');
const nameInputPopup = popup.querySelector('.popup__input_type_name');
const placeNameInputPopup = popupPlace.querySelector('.popup__input_type_placeName');
const aboutInputProfile = profile.querySelector('.profile__about');
const aboutInputPopup = popup.querySelector('.popup__input_type_description');
const LinkInputPopup = popupPlace.querySelector('.popup__input_type_imgLink');
const popupPic = popupImage.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const formAdd = document.querySelector('.popup-place__form');
const placeInput = formAdd.querySelector('.popup__input_type_placeName');
const userContainerElements = document.querySelector('.elements'); //контейнер
const userTemplate = document.querySelector('#user'); //dom template
const inputList = formAdd.querySelectorAll('.popup__input');
const submitButton = formAdd.querySelector('.popup__button');

function popupActionOpen(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', function (evt) {
        if (!evt.target.closest('.popup__container')) {
            popupActionClose(evt.target.closest('.popup'));
        }
    })
}

function popupActionClose(popup) {
    popup.classList.remove('popup_opened');
}

function saveInputValue(evt) {
    evt.preventDefault();
    nameInputProfile.textContent = nameInputPopup.value;
    aboutInputProfile.textContent = aboutInputPopup.value;
    popupActionClose(popup);
}

function renderElement() {
    const listItems = initialCards.map(composeItem);
    userContainerElements.append(...listItems);
}//рендерим массив
renderElement();

function composeItem(item) {
    const newItem = userTemplate.content.cloneNode(true);
    const userPlaceName = newItem.querySelector('.element__title');
    const userPlaceLink = newItem.querySelector('.element__image');
    userPlaceName.textContent = item.name;
    userPlaceLink.src = item.link;
    userPlaceLink.alt = item.name;
    const removeButton = newItem.querySelector('.element__trash');
    removeButton.addEventListener('click', removeItem);
    const likeButton = newItem.querySelector('.element__rectangle');
    likeButton.addEventListener('click', handleLikeClick);
    userPlaceLink.addEventListener('click', () => {
        PopupImageActionOpen(item) //где item объект с данными
    });
    return newItem;
}

function addNewItem(evt) {
    evt.preventDefault();
    const inputText = placeNameInputPopup.value;
    const inputLink = LinkInputPopup.value;
    const newItem = composeItem({ name: inputText, link: inputLink });
    userContainerElements.prepend(newItem);
    popupActionClose(popupPlace);
    formAdd.reset();
}

function removeItem(e) {
    e.target.closest('.element').remove();
}

function handleLikeClick(e) {
    e.target.classList.toggle('element__rectangle_active');
}

function PopupImageActionOpen(data) {
    popupPic.src = data.link;
    popupPic.alt = data.name;
    popupImageTitle.textContent = data.name;
    popupActionOpen(popupImage);
}

popupPlace.addEventListener('submit', addNewItem);

editButton.addEventListener('click', function () {
    nameInputPopup.value = nameInputProfile.textContent;
    aboutInputPopup.value = aboutInputProfile.textContent;
    popupActionOpen(popup);
});

popupCloseButton.addEventListener('click', function () {
    popupActionClose(popup);
});

addButton.addEventListener('click', function () {
    popupActionOpen(popupPlace);
});

popupPlaceCloseButton.addEventListener('click', function () {
    popupActionClose(popupPlace);
});

popupImageCloseButton.addEventListener('click', function () {
    popupActionClose(popupImage);
});

popup.addEventListener('submit', saveInputValue);

document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        popupActionClose(popupOpened);
    }
})