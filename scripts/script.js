let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let popupPlace = document.querySelector('.popup__place');
let popupImage = document.querySelector('.popup__image');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
let popupImageCloseButton = popupImage.querySelector('.popup__image-button');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let nameInputProfile = profile.querySelector('.profile__name');
let nameInputPopup = popup.querySelector('.popup__input_type_name');
let placeNameInputPopup = popupPlace.querySelector('.popup__input_type_placeName');
let aboutInputProfile = profile.querySelector('.profile__about');
let aboutInputPopup = popup.querySelector('.popup__input_type_description');
let LinkInputPopup = popupPlace.querySelector('.popup__input_type_imgLink');
let popupSaveButton = document.querySelector('.popup__button');
let popupCreateButton = popupPlace.querySelector('.popup__create');


function popupActionOpen(){
    nameInputPopup.value = nameInputProfile.textContent;
    aboutInputPopup.value = aboutInputProfile.textContent;
    popup.classList.add('popup_opened');
}

function popupPlaceActionOpen(){
    popupPlace.classList.add('popup_opened');
}



function popupPlaceActionClose(){
    popupPlace.classList.remove('popup_opened');
}

function popupImageActionClose(){
    popupImage.classList.remove('popup_opened');
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
addButton.addEventListener('click', popupPlaceActionOpen);
popupCloseButton.addEventListener('click', popupActionClose);
popupPlaceCloseButton.addEventListener('click', popupPlaceActionClose);
popupImageCloseButton.addEventListener('click', popupImageActionClose);
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

popupCreateButton.addEventListener('click', addNewItem);

function addNewItem(evt){
    evt.preventDefault();
    const inputText = placeNameInputPopup.value;
    const inputLink = LinkInputPopup.value;
    const newItem = composeItem({name: inputText, link: inputLink});
    userContainerElements.prepend(newItem);
    popupPlaceActionClose();
} 

function removeItem(e){
    const targetElement = e.target;
    const targetItem = targetElement.closest('.element');
    targetItem.remove();
}

function actionLike(e){
    const targetLike = e.target;
    const targetItem = targetLike.closest('.element__rectangle');
    targetItem.classList.add('element__rectangle_active');
}


function PopupImageActionOpen(e){
    const targetElement = e.target;
    const popupPic = popupImage.querySelector('.popup__image');
    const popupImageTitle = document.querySelector('.popup__image-title');
    // popupImageTitle.textContent = targetElement.closest('.element__title').textContent; почему то не работает:{
    popupImageTitle.textContent = document.querySelector('.element__title').textContent;
    popupPic.src = targetElement.closest('.element__image').src;
    popupImage.classList.add('popup_opened');
}