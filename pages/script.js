function getPopup() {
  return document.querySelector('.popup');
}

function closePopup() {
  getPopup().classList.remove('popup_opened');
}

function openPopup() {
  getPopup().classList.add('popup_opened');
}

function selectProfileName() {
  return document.querySelector('.profile__name');
}

function getUserName() {
  return selectProfileName().innerHTML;
}

function setUserName(newUserName) {
  selectProfileName().innerHTML = newUserName;
}

function selectProfileDescription() {
  return document.querySelector('.profile__description');
}

function getUserDescription() {
  return selectProfileDescription().innerHTML;
}

function setUserDescription(newUserDescription) {
  selectProfileDescription().innerHTML = newUserDescription;
}

document.querySelector('.profile__modify')
  .addEventListener("click", () => {
    openPopup();
    let nameInput = document.querySelector('.popup__input_name');
    nameInput.value = getUserName();
    let descriptionInput = document.querySelector('.popup__input_description');
    descriptionInput.value = getUserDescription();
  })

document.querySelector('.popup__form')
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup__input_name');
    setUserName(nameInput.value);
    let descriptionInput = document.querySelector('.popup__input_description');
    setUserDescription(descriptionInput.value);
    closePopup();
  })

document.querySelector('.popup__close-button')
  .addEventListener("click", () => {
    closePopup();
  })
