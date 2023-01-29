const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupDescriptionInput = document.querySelector('.popup__input_type_description');

function closePopup(p) {
  p.classList.remove('popup_opened');
}

function openPopup(p) {
  p.classList.add('popup_opened');
}

document.querySelector('.profile__modify')
  .addEventListener("click", () => {
    openPopup(popup);
    popupNameInput.value = profileName.textContent;
    popupDescriptionInput.value = profileDescription.textContent;;
  })

document.querySelector('.popup__form')
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileDescription.textContent = popupDescriptionInput.value;
    closePopup(popup);
  })

document.querySelector('.popup__close-button')
  .addEventListener("click", () => {
    closePopup(popup);
  })
