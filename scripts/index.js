import FormValidator from './FormValidator.js';
import Card from './Card.js';

import {
  popupEditProfile,
  profileName,
  profileDescription,
  popupEditProfileNameInput,
  popupEditProfileDescriptionInput,
  cardZoomPopup,
  popupAddCard,
  popupAddCardNameInput,
  popupAddCardLinkInput,
  buttonsClose,
  popupEditProfileForm,
  popupAddCardForm,
  placesSection,
  validationParams,
  initialCards,
} from './constants.js';

const formValidatorEditProfile = new FormValidator(validationParams, popupEditProfileForm);
const formValidatorAddCard = new FormValidator(validationParams, popupAddCardForm);
formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();


const handleClosePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

function closePopup(p) {
  p.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc)
}

function openPopup(p) {
  p.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
}

const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target.closest('.popup'));
  }
}

popupEditProfile.addEventListener('click', closePopupOverlay);
cardZoomPopup.addEventListener('click', closePopupOverlay);
popupAddCard.addEventListener('mousedown', closePopupOverlay);

const openPopupEditProfile = () => {
  popupEditProfileNameInput.value = profileName.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;
  formValidatorEditProfile.hideErrors();
  openPopup(popupEditProfile);
}
document.querySelector('.profile__modify')
  .addEventListener("click", () => openPopupEditProfile());

popupEditProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = popupEditProfileNameInput.value;
  profileDescription.textContent = popupEditProfileDescriptionInput.value;
  closePopup(popupEditProfile);
})

buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function createCard(name, link) {
  const card = new Card(name, link, openPopup);
  return card.generateCard();
}

function initCards() {
  initialCards.forEach(elm => {
    const card = createCard(elm.name, elm.link);
    placesSection.append(card);
  })
}

initCards();

document.querySelector('.profile__add-button')
  .addEventListener("click", () => {
    formValidatorAddCard.hideErrors();
    popupAddCardForm.reset();
    openPopup(popupAddCard);
  })

popupAddCardForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const newCardName = popupAddCardNameInput.value;
  const newCardLink = popupAddCardLinkInput.value;
  placesSection.prepend(createCard(newCardName, newCardLink));
  closePopup(popupAddCard);
  evt.target.reset();
})

