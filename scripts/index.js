const popupEditProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupEditProfileNameInput = document.querySelector('.popup__input_type_name');
const popupEditProfileDescriptionInput = document.querySelector('.popup__input_type_description');

const cardZoomPopup = document.querySelector('.popup_zoom');

const popupAddCard = document.querySelector('.popup_add');
const popupAddCardNameInput = popupAddCard.querySelector('.popup__input_type_title');
const popupAddCardLinkInput = popupAddCard.querySelector('.popup__input_type_link');
const cardZoomPopupImage = cardZoomPopup.querySelector('.popup__image');
const cardZoomPopupCaption = cardZoomPopup.querySelector('.popup__caption');

const buttonsClose = document.querySelectorAll('.popup__close-button');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');


const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
}

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
popupAddCard.addEventListener('click', closePopupOverlay);

document.querySelector('.profile__modify')
  .addEventListener("click", () => {
    popupEditProfileNameInput.value = profileName.textContent;
    popupEditProfileDescriptionInput.value = profileDescription.textContent;
    hideFormErrors(popupEditProfile, validationParams);
    openPopup(popupEditProfile);
  })

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


const cardTemplate = document.querySelector('#card').content;
const placesSection = document.querySelector('.places');
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

const cardTemplatePlaces = cardTemplate.querySelector('.places__card');

function createCard(name, link) {
  const card = cardTemplatePlaces.cloneNode(true);
  const cardImage = card.querySelector('.places__image');
  const buttonDelete = card.querySelector('.places__button_delete')
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector('.places__name').textContent = name;

  card.querySelector('.places__like').addEventListener('click', evt => {
    evt.target.classList.toggle('places__like_active');
  })

  cardImage.addEventListener('click', evt => {
    cardZoomPopupImage.src = evt.target.src;
    cardZoomPopupImage.alt = evt.target.alt;
    cardZoomPopupCaption.textContent = cardZoomPopupImage.alt;
    openPopup(cardZoomPopup);
  })

  buttonDelete.addEventListener('click', evt => {
      card.remove();
    }
  )
  return card;
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
    hideFormErrors(popupAddCard, validationParams);
    popupAddCardForm.reset();
    openPopup(popupAddCard);
  })

popupAddCardForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const newCardName = popupAddCardNameInput.value;
  const newCardLink = popupAddCardLinkInput.value;
  placesSection.insertBefore(createCard(newCardName, newCardLink), placesSection.firstChild);
  closePopup(popupAddCard);
  evt.target.reset();
})

