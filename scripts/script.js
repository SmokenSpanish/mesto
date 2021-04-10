import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
    popupImage, configValidate, initialCards, popupProfile, popupPlace, popupCloseButton, popupPlaceCloseButton, popupImageCloseButton,
    profileEditButton, profileAddButton, nameInputProfile, nameInputPopup, placeNameInputPopup, profileAboutInput, popupAboutInput, popupLinkInput, formAdd, userContainerElements, profileForm
} from "./Utils.js";

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



function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', popupKeydownExit);

}

function closePopup(popup) {
    document.removeEventListener('keydown', popupKeydownExit);
    popup.classList.remove('popup_opened');
}

function saveInputValue(evt) {
    evt.preventDefault();
    nameInputProfile.textContent = nameInputPopup.value;
    profileAboutInput.textContent = popupAboutInput.value;
    closePopup(popupProfile);
}

function addNewItem(evt) {
    evt.preventDefault();
    const inputText = placeNameInputPopup.value;
    const inputLink = popupLinkInput.value;
    const card = createCard({ name: inputText, link: inputLink });
    userContainerElements.prepend(card);
    closePopup(popupPlace);
    formAdd.reset();
    addCardFormValidator.clearValidation();
}

function popupKeydownExit(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function closePopupAria(evt) {
    if (!evt.target.closest('.popup__container')) {
        closePopup(evt.target.closest('.popup'));
    }
}

popupPlace.addEventListener('submit', addNewItem);

profileEditButton.addEventListener('click', function () {
    nameInputPopup.value = nameInputProfile.textContent;
    popupAboutInput.value = profileAboutInput.textContent;
    openPopup(popupProfile);
});

popupCloseButton.addEventListener('click', function () {
    closePopup(popupProfile);
});

profileAddButton.addEventListener('click', function () {
    openPopup(popupPlace);
});

popupPlaceCloseButton.addEventListener('click', function () {
    closePopup(popupPlace);
});

popupImageCloseButton.addEventListener('click', function () {
    closePopup(popupImage);
});

popupProfile.addEventListener('submit', saveInputValue);

popupProfile.addEventListener('mousedown', closePopupAria);

popupPlace.addEventListener('mousedown', closePopupAria);

popupImage.addEventListener('mousedown', closePopupAria);



export { openPopup }