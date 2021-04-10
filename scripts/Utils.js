const configValidate = {
    formElement: '.popup__forms',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    buttonInvalidClass: '.popup__input_state_invalid'
};
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

const profile = document.querySelector('.profile');
const popupProfile = document.querySelector('.popup-profile');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImage = document.querySelector('.popup-image');
const popupPlace = document.querySelector('.popup-place');
const popupCloseButton = popupProfile.querySelector('.popup__close-button');
const popupPic = popupImage.querySelector('.popup__image');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImageCloseButton = popupImage.querySelector('.popup__image-button');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const nameInputProfile = profile.querySelector('.profile__name');
const nameInputPopup = popupProfile.querySelector('.popup__input_type_name');
const placeNameInputPopup = popupPlace.querySelector('.popup__input_type_placeName');
const profileAboutInput = profile.querySelector('.profile__about');
const popupAboutInput = popupProfile.querySelector('.popup__input_type_description');
const popupLinkInput = popupPlace.querySelector('.popup__input_type_imgLink');
const formAdd = document.querySelector('.popup-place__form');
const userContainerElements = document.querySelector('.elements'); //контейнер
const profileForm = popupProfile.querySelector('.popup__forms');

export { 
    initialCards,
    configValidate,
    popupProfile,
    profile,
    popupPlace,
    popupCloseButton,
    popupPic,
    popupImageTitle, 
    popupImage,
    popupPlaceCloseButton,
    popupImageCloseButton,
    profileEditButton,
    profileAddButton,
    nameInputProfile,
    nameInputPopup,
    placeNameInputPopup,
    profileAboutInput,
    popupAboutInput,
    popupLinkInput,
    formAdd,
    userContainerElements,
    profileForm
}
