import './index.css';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import {api} from '../components/Api.js';

import {
  popupEditProfileSelector,
  popupEditProfileNameInput,
  popupEditProfileDescriptionInput,
  buttonEditProfile,
  cardZoomPopupSelector,
  buttonOpenAddCard,
  popupEditProfileForm,
  popupAddCardForm,
  validationParams,
  placesContainerSection,
  popupAddCardSelector,
  popupWithConfirmationSelector,
  buttonAvatar,
  popupAvatarSelector,
  popupAvatarForm,
} from '../utils/constants.js';

let userId

function loadUserInfo() {
  api.getUserInfo()
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      })
      userInfo.setUserAvatar({
        avatar: res.avatar,
      })
      userId = res._id
    })
    .catch((err) => {
      console.log(err);
    })
}

function loadCards() {
  api.getCards()
    .then((res) => {
      res.reverse().forEach(item => {
        section.addItem(item)
      })
    })
    .catch((err) => {
      console.log(err);
    })
}


const formValidatorEditProfile = new FormValidator(validationParams, popupEditProfileForm);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(validationParams, popupAddCardForm);
formValidatorAddCard.enableValidation();

const formValidatorSetAvatar = new FormValidator(validationParams, popupAvatarForm);
formValidatorSetAvatar.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
})

const popupWithImage = new PopupWithImage(cardZoomPopupSelector);
popupWithImage.setEventListeners();

const popupWithEditProfileForm = new PopupWithForm(popupEditProfileSelector, (data) => {
  popupWithEditProfileForm.renderLoading(true);
  api.setNewInfo(data)
    .then(res => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });
      popupWithEditProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupWithEditProfileForm.renderLoading(false));
});
popupWithEditProfileForm.setEventListeners();

const popupWithAddCardForm = new PopupWithForm(popupAddCardSelector, (data) => {
  if (data.name === '' || data.link === '') {
    return
  }
  popupWithAddCardForm.renderLoading(true);
  api.addNewCard(data)
    .then(res => {
      section.addItem(res)
      popupWithAddCardForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupWithAddCardForm.renderLoading(false));
});
popupWithAddCardForm.setEventListeners();


const popupWithConfirmation = new PopupWithConfirmation(popupWithConfirmationSelector);
popupWithConfirmation.setEventListeners();

const popupWithEditAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  popupWithEditAvatar.renderLoading(true);
  api.setNewAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupWithEditAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupWithEditAvatar.renderLoading(false));
});

popupWithEditAvatar.setEventListeners();


buttonAvatar.addEventListener('click', () => {
  formValidatorSetAvatar.hideErrors();
  popupWithEditAvatar.open();
})

buttonEditProfile.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupEditProfileNameInput.value = currentUserInfo.name;
  popupEditProfileDescriptionInput.value = currentUserInfo.description;
  formValidatorEditProfile.hideErrors();
  popupWithEditProfileForm.open();
});

buttonOpenAddCard.addEventListener("click", () => {
  formValidatorAddCard.hideErrors();
  popupAddCardForm.reset();
  popupWithAddCardForm.open();
});

const handleLikeCard = (card) => {
  api.toggleLike(card.getId(), card.isLiked())
    .then(res => {
      card.setLikes(res.likes)
    })
    .catch((err) => {
      console.log(err);
    })
}

const handleCardClick = (link, name) => {
  popupWithImage.open(link, name);
};

const handleDeleteButtonClick = card => {
  popupWithConfirmation.open(() => {
    api.deleteCard(card.getId())
      .then(res => {
        card.remove()
      })
      .catch((err) => {
        console.log(err);
      })
  })
};

function createCard(data) {
  const card = new Card(data, userId, '#card',
    handleLikeCard,
    handleCardClick,
    handleDeleteButtonClick);
  return card.generateCard();
}


const section = new Section(placesContainerSection, createCard);

loadUserInfo();
loadCards()




