let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupCloseAction = popup.querySelector('.popup_opened');
let editButton = profile.querySelector('.profile__edit-button');
let nameInputProfile = profile.querySelector('.profile__name');
let nameInputPopup = popup.querySelector('.popup__name');
let aboutInputProfile = profile.querySelector('.profile__about');
let aboutInputPopup = popup.querySelector('.popup__about');
let popupSaveButton = document.querySelector('.popup__button');


function popupActionOpen(){
    popup.classList.add('popup_opened');
    nameInputPopup.value = nameInputProfile.textContent;
    aboutInputPopup.value = aboutInputProfile.textContent;
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
popupSaveButton.addEventListener('click', saveInputValue);