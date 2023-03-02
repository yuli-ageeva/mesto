const enableButton = (buttonElement, params) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(params.inactiveButtonClass);
};
const disableButton = (buttonElement, params) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(params.inactiveButtonClass);
};
const toggleButtonState = (inputs, submitElement, params) => {
  const formIsValid = inputs.every(inputElement => inputElement.validity.valid)
  if (formIsValid) {
    enableButton(submitElement, params);
  } else {
    disableButton(submitElement, params);
  }
};

const showInputError = (popupForm, popupInput, errorMessage, params) => {
  const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(params.inputErrorClass);
  popupError.textContent = errorMessage;
};

const hideInputError = (popupForm, popupInput, params) => {
  const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(params.inputErrorClass);
  popupError.textContent = '';
};

const toggleInputState = (popupForm, popupInput, params) => {
  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage, params);
  } else {
    hideInputError(popupForm, popupInput, params);
  }
};

const setEventListeners = (popupForm, params) => {
  const popupInputs = Array.from(popupForm.querySelectorAll(params.inputSelector));
  const submitButton = popupForm.querySelector(params.submitButtonSelector);
  popupInputs.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      toggleInputState(popupForm, popupInput, params);
      toggleButtonState(popupInputs, submitButton, params);
    });
  });
};


const enableValidation = (params) => {
  const popupForms = Array.from(document.querySelectorAll(params.formSelector));
  popupForms.forEach((popupForm) => {
    setEventListeners(popupForm, params);
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
});
