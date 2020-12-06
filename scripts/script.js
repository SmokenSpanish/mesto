let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let editButton = profile.querySelector('.profile__edit-button');
let nameInputProfile = profile.querySelector('.profile__name');
let nameInputPopup = popup.querySelector('.popup__input_type_name');
let aboutInputProfile = profile.querySelector('.profile__about');
let aboutInputPopup = popup.querySelector('.popup__input_type_description');
let popupSaveButton = document.querySelector('.popup__button');


function popupActionOpen(){
    nameInputPopup.value = nameInputProfile.textContent;
    aboutInputPopup.value = aboutInputProfile.textContent;
    popup.classList.add('popup_opened');
}


function popupActionClose(){
    popup.classList.remove('popup_opened');
}


function saveInputValue(evt) {
    evt.preventDefault();
    nameInputProfile.textContent = nameInputPopup.value;
    aboutInputProfile.textContent = aboutInputPopup.value;
    popupActionClose();
}

editButton.addEventListener('click',popupActionOpen);
popupCloseButton.addEventListener('click',popupActionClose);
popup.addEventListener('submit', saveInputValue);