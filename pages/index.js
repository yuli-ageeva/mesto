const editProfilePopup = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editProfilePopupNameInput = document.querySelector('.popup__input_type_name');
const editProfilePopupDescriptionInput = document.querySelector('.popup__input_type_description');

const cardZoomPopup = document.querySelector('.popup_zoom');

const addCardPopup = document.querySelector('.popup_add');
const addCardPopupNameInput = addCardPopup.querySelector('.popup__input_type_title');
const addCardPopupLinkInput = addCardPopup.querySelector('.popup__input_type_link');


function closePopup(p) {
  p.classList.remove('popup_opened');
}

function openPopup(p) {
  p.classList.add('popup_opened');
}

document.querySelector('.profile__modify')
  .addEventListener("click", () => {
    openPopup(editProfilePopup);
    editProfilePopupNameInput.value = profileName.textContent;
    editProfilePopupDescriptionInput.value = profileDescription.textContent;;
  })

document.querySelector('.popup__form')
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = editProfilePopupNameInput.value;
    profileDescription.textContent = editProfilePopupDescriptionInput.value;
    closePopup(editProfilePopup);
  })

document.querySelector('.popup__close-button')
  .addEventListener("click", () => {
    closePopup(editProfilePopup);
  })

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
    cardZoomPopup.querySelector('.popup__image').src = evt.target.src;
    cardZoomPopup.querySelector('.popup__image').alt = evt.target.alt;
    cardZoomPopup.querySelector('.popup__caption').textContent = evt.target.parentNode.querySelector('.places__name').textContent;
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

cardZoomPopup.querySelector('.popup__close-button')
  .addEventListener("click", () => {
    closePopup(cardZoomPopup);
  })


document.querySelector('.profile__add-button')
  .addEventListener("click", () => {
    openPopup(addCardPopup);
  })

addCardPopup.querySelector('.popup__close-button')
  .addEventListener("click", () => {
    closePopup(addCardPopup);
  })

addCardPopup.querySelector('.popup__form').addEventListener('submit', evt => {
  evt.preventDefault();
  const newCardName = addCardPopupNameInput.value;
  const newCardLink = addCardPopupLinkInput.value;
  placesSection.insertBefore(createCard(newCardName, newCardLink), placesSection.firstChild);
  closePopup(addCardPopup);
  addCardPopupNameInput.value = '';
  addCardPopupLinkInput.value = '';
})


