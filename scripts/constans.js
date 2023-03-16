export const popupEditProfile = document.querySelector('.popup_profile');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const popupEditProfileNameInput = document.querySelector('.popup__input_type_name');
export const popupEditProfileDescriptionInput = document.querySelector('.popup__input_type_description');
export const cardZoomPopup = document.querySelector('.popup_zoom');
export const popupAddCard = document.querySelector('.popup_add');
export const popupAddCardNameInput = popupAddCard.querySelector('.popup__input_type_title');
export const popupAddCardLinkInput = popupAddCard.querySelector('.popup__input_type_link');
export const buttonsClose = document.querySelectorAll('.popup__close-button');
export const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
export const popupAddCardForm = popupAddCard.querySelector('.popup__form');
export const placesSection = document.querySelector('.places');
export const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};
export const initialCards = [
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
