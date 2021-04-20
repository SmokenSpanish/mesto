import './index.css';
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js"
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {
    configValidate, initialCards, profileEditButton,
    profileAddButton, nameInputProfile, profileAboutInput,
    formAdd, userContainerElements,
    profileForm, addCardPopupSelector,
    profilePopupSelector
} from "../utils/Utils.js";

const handleAddCard = () => {
    formAdd.reset();
    addCardFormValidator.clearValidation();
    addCardPopup.open();
};

const handleEditProfile = () => {
    const { name, job } = user.getUserInfo();
    nameInputProfile.value = name;
    profileAboutInput.value = job;
    profileFormValidator.clearValidation();
    profilePopup.open();
};

const popupWithImage = new PopupWithImage('.popup-image');

const getCard = (data) => {
    const card = new Card(data, () => popupWithImage.open(data.link, data.name), '.template');
    return card.generateCard();
}

const cardList = new Section({
    items: initialCards, renderer: (data) => {
        cardList.addItem(getCard(data))
    },
},
    userContainerElements
);

const user = new UserInfo({
    nameSelector: nameInputProfile,
    jobSelector: profileAboutInput,
});

const profileSubmitHandler = (data) => {
    user.setUserInfo({
        name: data["username"],
        job: data["userjob"],
    });
    profilePopup.close();
};

const profilePopup = new PopupWithForm(profilePopupSelector, (data) =>
    profileSubmitHandler(data)
);

const addCardSubmitHandler = (data) => {
    const name = data["placename"];
    const link = data["placelink"];
    cardList.addItem(getCard({ link, name }));
    addCardPopup.close();
};

const addCardPopup = new PopupWithForm(addCardPopupSelector, (data) =>
    addCardSubmitHandler(data)
);


const profileFormValidator = new FormValidator(configValidate, profileForm);
const addCardFormValidator = new FormValidator(configValidate, formAdd);


popupWithImage.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

profileAddButton.addEventListener("click", handleAddCard);
profileEditButton.addEventListener("click", handleEditProfile);

cardList.renderItems();
