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
const popupSaveButton = document.querySelector('.popup__button');
const popupCreateButton = popupPlace.querySelector('.popup__create');
const popupPic = popupImage.querySelector('.popup__image');

function popupActionOpen(popup){
    popup.classList.add('popup_opened');
}

function popupActionClose(popup){
    popup.classList.remove('popup_opened');
}

function saveInputValue(evt) {
    evt.preventDefault();
    nameInputProfile.textContent = nameInputPopup.value;
    aboutInputProfile.textContent = aboutInputPopup.value;
    popupActionClose(popup);
}

editButton.addEventListener('click', function(){
    nameInputPopup.value = nameInputProfile.textContent;
    aboutInputPopup.value = aboutInputProfile.textContent;
    popupActionOpen(popup);
});

popupCloseButton.addEventListener('click', function(){
    popupActionClose(popup);
});

addButton.addEventListener('click', function(){
    popupActionOpen(popupPlace);
});

popupPlaceCloseButton.addEventListener('click', function(){
    popupActionClose(popupPlace);
});

popupImageCloseButton.addEventListener('click', function(){
    popupActionClose(popupImage);
});

popup.addEventListener('submit', saveInputValue);


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

const userContainerElements = document.querySelector('.elements'); //контейнер
const userTemplate = document.querySelector('#user'); //dom template

function renderElement(){
    const listItems = initialCards.map(composeItem);
    userContainerElements.append(...listItems);
}//рендерим массив
renderElement();


function composeItem(item){
    const newItem = userTemplate.content.cloneNode(true);
    const userPlaceName = newItem.querySelector('.element__title');
    const userPlaceLink = newItem.querySelector('.element__image');
    userPlaceName.textContent = item.name;
    userPlaceLink.src = item.link;
    const removeButton = newItem.querySelector('.element__trash');
    removeButton.addEventListener('click', removeItem);
    const likeButton = newItem.querySelector('.element__rectangle');
    likeButton.addEventListener('click', actionLike);
    userPlaceLink.addEventListener('click', PopupImageActionOpen);
    return newItem;
}



function addNewItem(evt) {
    evt.preventDefault();
    const inputText = placeNameInputPopup.value;
    const inputLink = LinkInputPopup.value;
    const newItem = composeItem({name: inputText, link: inputLink});
    userContainerElements.prepend(newItem);
    popupActionClose(popupPlace);
} 

popupPlace.addEventListener('submit', addNewItem);

function removeItem(e){
    const targetElement = e.target;
    const targetItem = targetElement.closest('.element');
    targetItem.remove();
}

function actionLike(e){
    const targetLike = e.target;
    const targetItem = targetLike.closest('.element__rectangle');
    targetItem.classList.toggle('element__rectangle_active');
}


function PopupImageActionOpen(e){
    const targetElement = e.target;
    const popupImageTitle = document.querySelector('.popup__image-title');
    // popupImageTitle.textContent = targetElement.closest('.element__title').textContent; почему то не работает:{
    popupImageTitle.textContent = document.querySelector('.element__title').textContent;
    popupPic.src = targetElement.closest('.element__image').src;
    popupImage.classList.add('popup_opened');
}