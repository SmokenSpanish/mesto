import Api from "../components/Api.js";
import './index.css';
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js"
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js"
import {
    configAPI, configValidate, profileEditButton,
    profileAddButton,
    formAdd, userContainerElements,
    profileForm, addCardPopupSelector,
    profilePopupSelector, confirmPopupSelector, avatarPopupSelector, avatarForm, avatarLogo,
    nameSelector, jobSelector, avatarSelector, popupAboutInput, nameInputPopup
} from "../utils/constants.js";

let currentUser;

const handleAddCard = () => {
    addCardFormValidator.clearValidation();
    addCardPopup.open();
};

const handleEditProfile = () => {
    const { name, job } = userEl.getUserInfo();
    nameInputPopup.value = name;
    popupAboutInput.value = job;
    profileFormValidator.clearValidation();
    profilePopup.open();
};

const popupWithImage = new PopupWithImage('.popup-image');

const confirmAction = () => {
    return new Promise((res, rej) => {
        confirmPopup.open(res, rej);
    });
};

function deleteCardWithConfirm(data, card) {
    api.deleteCard(data)
        .then(() => {
            card.remove();
            card = null;
        })
        .catch((err) => {
            console.log("Ошибка при удалении карточки");
            console.log(err);
        })
}

const getCard = (data) => {
    const card = new Card(data, currentUser, '.template', () => popupWithImage.open(data.link, data.name), {
        handleToggleLike: function (action, cardId) {
            if (action === "PUT") {
                return api.putLike(cardId);
            } else {
                return api.deleteLike(cardId);
            }
        },
    },
        {
            handleDeleteCard: function (cardId, cardEl) {
                confirmAction()
                    .then(() => {
                        deleteCardWithConfirm(cardId, cardEl);
                    })
                    .catch(() => console.log("отказ от удаления карточки"));
            },
        }
    );
    return card.generateCard();
};

const cardList = new Section({
    renderer: getCard,
},
    userContainerElements
);

const userEl = new UserInfo({
    nameSelector,
    jobSelector,
    avatarSelector
});

const profilePopup = new PopupWithForm(profilePopupSelector, {
    handleFormSubmit: function (user) {
        profilePopup.renderLoading();
        api.setUserInfo(user)
            .then((userData) => {
                userEl.setUserInfo(userData);
                profilePopup.close();
            })
            .catch((err) => {
                console.log(err);
            });
    },
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, {
    handleFormSubmit: function (card) {
        addCardPopup.renderLoading();
        api.createCard(card)
            .then((card) => {
                cardList.addItem(card);
                addCardPopup.close();
            })
            .catch((err) => {
                console.log(err);
            });
    },
}
);

const avatarPopup = new PopupWithForm(avatarPopupSelector, {
    handleFormSubmit: function ({ avatar }) {
        avatarPopup.renderLoading();
        api
            .updateAvatar(avatar)
            .then((userData) => {
                userEl.setUserAvatar(userData);
                avatarPopup.close();
            })
            .catch((err) => {
                console.log("Обновление аватара", err);
            });
    },
});

const handleUpdateAvatar = () => {
    avatarFormValidator.clearValidation();
    avatarPopup.open();
};

const confirmPopup = new PopupWithConfirm(confirmPopupSelector, {
    handleFormSubmit: function () { },
});

const profileFormValidator = new FormValidator(configValidate, profileForm);
const addCardFormValidator = new FormValidator(configValidate, formAdd);
const avatarFormValidator = new FormValidator(configValidate, avatarForm);

popupWithImage.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

profileAddButton.addEventListener("click", handleAddCard);
profileEditButton.addEventListener("click", handleEditProfile);
avatarLogo.addEventListener("click", handleUpdateAvatar);

const api = new Api(configAPI);

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        currentUser = userData;
        userEl.setUserInfo(currentUser);
        userEl.setUserAvatar(currentUser);
        cardList.setItems(cards);
        cardList.renderItems();
    })
    .catch((err) => {
        console.log("Один из промисов отклонен", err);
    });