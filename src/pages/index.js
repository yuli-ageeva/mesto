import Section from "../components/Section.js";
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

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
  initialCards, placesContainerSection, popupAddCardSelector,
} from '../utils/constants.js';

const formValidatorEditProfile = new FormValidator(validationParams, popupEditProfileForm);
const formValidatorAddCard = new FormValidator(validationParams, popupAddCardForm);
formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();

const userInfo = new UserInfo({nameSelector:'.profile__name', descriptionSelector:'.profile__description'})

const popupWithImage = new PopupWithImage(cardZoomPopupSelector);
popupWithImage.setEventListeners();


const popupWithEditProfileForm = new PopupWithForm(popupEditProfileSelector,(data) => {
  userInfo.setUserInfo(data);
  popupWithEditProfileForm.close();
});
popupWithEditProfileForm.setEventListeners();

const popupWithAddCardForm = new PopupWithForm(popupAddCardSelector,({title, source}) => {
  if (title === '' || source === '') {
    return
  }
  initCards({name: title, link: source});
  popupWithAddCardForm.close();
});

popupWithAddCardForm.setEventListeners();



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



function createCard(data) {
  const card = new Card(data,'#card',  (link,name) => popupWithImage.open(link,name));
  return card.generateCard();
}

const initCards = (data) => {
    const card = createCard(data);
    cardList.addItem(card);
  }

const cardList = new Section({items:initialCards, renderer:initCards},placesContainerSection);
cardList.renderInitialItems();




