const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupCloseAction = popup.querySelector('.popup__opened');
const editButton = profile.querySelector('.profile__edit-button');

editButton.addEventListener('click',popupActionOpen);
popupCloseButton.addEventListener('click',popupActionClose);

function popupActionOpen(){
    popup.classList.add('popup__opened');
}


function popupActionClose(){
    popup.classList.remove('popup__opened');
}

const nameInputProfile = profile.querySelector('.profile__name');
const nameInputPopup = popup.querySelector('.popup__name');
const aboutInputProfile = profile.querySelector('.profile__about');
const aboutInputPopup = popup.querySelector('.popup__about');

nameInputPopup.value = nameInputProfile.textContent;
aboutInputPopup.value = aboutInputProfile.textContent;

const popupSaveButton = document.querySelector('.popup__button');
popupSaveButton.addEventListener('click', saveNameInputValue);
  popupSaveButton.addEventListener('click', saveAboutInputValue);
function saveNameInputValue(evt) {
    evt.preventDefault();
    let SaveActName = nameInputPopup.value;
    nameInputProfile.textContent = SaveActName;
    popupActionClose();
}

function saveAboutInputValue(evt) {
    evt.preventDefault();
    let SaveActAbout = aboutInputPopup.value;
    aboutInputProfile.textContent = SaveActAbout;
    popupActionClose();
}
