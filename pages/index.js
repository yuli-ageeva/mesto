const editProfilePopup = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editProfilePopupNameInput = document.querySelector('.popup__input_type_name');
const editProfilePopupDescriptionInput = document.querySelector('.popup__input_type_description');

const cardZoomPopup = document.querySelector('.popup_zoom');

const addCardPopup = document.querySelector('.popup_add');
const addCardPopupNameInput = addCardPopup.querySelector('.popup__input_type_title');
const addCardPopupLinkInput = addCardPopup.querySelector('.popup__input_type_link');
const cardZoomPopupImage = cardZoomPopup.querySelector('.popup__image');
const cardZoomPopupCaption = cardZoomPopup.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close-button');

const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
}

const escKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup);
  }
}

function closePopup(p) {
  p.classList.remove('popup_opened');
  document.removeEventListener('keydown', escKeydownHandler)
  p.querySelector(".popup__form").reset()
}

function openPopup(p) {
  p.classList.add('popup_opened');
  document.addEventListener('keydown', escKeydownHandler);
  hideFormErrors(p, params);
}

const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target.closest('.popup'));
  }
}

editProfilePopup.addEventListener('click', closePopupOverlay);
cardZoomPopup.addEventListener('click', closePopupOverlay);
addCardPopup.addEventListener('click', closePopupOverlay);

document.querySelector('.profile__modify')
  .addEventListener("click", () => {
    editProfilePopupNameInput.value = profileName.textContent;
    editProfilePopupDescriptionInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
  })

editProfilePopup.querySelector('.popup__form')
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = editProfilePopupNameInput.value;
    profileDescription.textContent = editProfilePopupDescriptionInput.value;
    editProfilePopup.querySelector('.popup__form').reset();
    closePopup(editProfilePopup);
  })

closeButtons.forEach((button) => {
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

function createCard(name, link) {
  const card = cardTemplate.querySelector('.places__card').cloneNode(true);

  const cardImage = card.querySelector('.places__image');
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector('.places__name').textContent = name;

  card.querySelector('.places__like').addEventListener('click', evt => {
    evt.target.classList.toggle('places__like_active');
  })

  cardImage.addEventListener('click', evt => {
    cardZoomPopupImage.src = evt.target.src;
    cardZoomPopupImage.alt = evt.target.alt;
    cardZoomPopupCaption.textContent = evt.target.parentNode.querySelector('.places__name').textContent;
    openPopup(cardZoomPopup);
  })

  card.querySelector('.places__button_delete').addEventListener('click', evt => {
      evt.target.parentNode.remove();
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
    openPopup(addCardPopup);
  })

addCardPopup.querySelector('.popup__form').addEventListener('submit', evt => {
  evt.preventDefault();
  const newCardName = addCardPopupNameInput.value;
  const newCardLink = addCardPopupLinkInput.value;
  placesSection.insertBefore(createCard(newCardName, newCardLink), placesSection.firstChild);
  closePopup(addCardPopup);
  evt.target.reset();
})

