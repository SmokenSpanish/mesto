import { initialCards } from "./Card.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { configValidate } from "./FormValidator.js";

const profile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup-profile');
const popupPlace = document.querySelector('.popup-place');
const popupImage = document.querySelector('.popup-image');
const popupCloseButton = popupProfile.querySelector('.popup__close-button');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__image-button');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const nameInputProfile = profile.querySelector('.profile__name');
const nameInputPopup = popupProfile.querySelector('.popup__input_type_name');
const placeNameInputPopup = popupPlace.querySelector('.popup__input_type_placeName');
const aboutInputProfile = profile.querySelector('.profile__about');
const aboutInputPopup = popupProfile.querySelector('.popup__input_type_description');
const LinkInputPopup = popupPlace.querySelector('.popup__input_type_imgLink');
const popupPic = popupImage.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const formAdd = document.querySelector('.popup-place__form');
const placeInput = formAdd.querySelector('.popup__input_type_placeName');
const userContainerElements = document.querySelector('.elements'); //контейнер
const inputList = formAdd.querySelectorAll('.popup__input');
const submitButton = formAdd.querySelector('.popup__button');
const createButton = popupPlace.querySelector('.popup__create');
const profileForm = popupProfile.querySelector('.popup__forms');



const profileFormValidator = new FormValidator(configValidate, profileForm);
const addCardFormValidator = new FormValidator(configValidate, formAdd);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function createCard(item) {
    const card = new Card(item.link, item.name, '.template');
    return card.generateCard();
}

initialCards.forEach((item) => {
    const newCard = createCard(item);
    userContainerElements.append(newCard);
});



function popupActionOpen(popup) {
    popup.classList.add('popup_opened');
    addCardFormValidator.clearValidation();
    document.addEventListener('keydown', popupKeydownExit);

}

function popupActionClose(popup) {
    document.removeEventListener('keydown', popupKeydownExit);
    popup.classList.remove('popup_opened');
}

function saveInputValue(evt) {
    evt.preventDefault();
    nameInputProfile.textContent = nameInputPopup.value;
    aboutInputProfile.textContent = aboutInputPopup.value;
    popupActionClose(popupProfile);
}

function addNewItem(evt) {
    evt.preventDefault();
    const inputText = placeNameInputPopup.value;
    const inputLink = LinkInputPopup.value;
    const card = createCard({ name: inputText, link: inputLink });
    userContainerElements.prepend(card);
    popupActionClose(popupPlace);
    formAdd.reset();
}

function popupKeydownExit(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        popupActionClose(popupOpened);
    }
}

function closePopupAria(evt) {
    if (!evt.target.closest('.popup__container')) {
        popupActionClose(evt.target.closest('.popup'));
    }
}

popupPlace.addEventListener('submit', addNewItem);

editButton.addEventListener('click', function () {
    nameInputPopup.value = nameInputProfile.textContent;
    aboutInputPopup.value = aboutInputProfile.textContent;
    popupActionOpen(popupProfile);
});

popupCloseButton.addEventListener('click', function () {
    popupActionClose(popupProfile);
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

popupProfile.addEventListener('submit', saveInputValue);

popupProfile.addEventListener('mousedown', closePopupAria);

popupPlace.addEventListener('mousedown', closePopupAria);

popupImage.addEventListener('mousedown', closePopupAria);



