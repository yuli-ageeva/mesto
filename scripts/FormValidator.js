export default class FormValidator {
  constructor(validationParams, form) {
    this._validationParams = validationParams;
    this._form = form;

  }

  enableValidation() {
    this._setEventListeners();
  }

  hideErrors() {
    const popupInputs = Array.from(this._form.querySelectorAll(this._validationParams.inputSelector));
    const buttonElement = this._form.querySelector(this._validationParams.submitButtonSelector);
    this._toggleButtonState(popupInputs, buttonElement);
    popupInputs.forEach((popupInput) => {
      this._hideInputError(popupInput);
    });
  }

  _setEventListeners() {
    const popupInputs = Array.from(this._form.querySelectorAll(this._validationParams.inputSelector));
    const submitButton = this._form.querySelector(this._validationParams.submitButtonSelector);
    popupInputs.forEach((popupInput) => {
      popupInput.addEventListener('input', () => {
        this._toggleInputState(popupInput);
        this._toggleButtonState(popupInputs, submitButton);
      });
    });
  }

  _toggleButtonState(inputs, submitElement) {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid)
    if (formIsValid) {
      this._enableButton(submitElement);
    } else {
      this._disableButton(submitElement);
    }
  };

  _toggleInputState(popupInput) {
    if (!popupInput.validity.valid) {
      this._showInputError(popupInput, popupInput.validationMessage);
    } else {
      this._hideInputError(popupInput);
    }
  };

  _enableButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._validationParams.inactiveButtonClass);
  };

  _disableButton(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._validationParams.inactiveButtonClass);
  };


  _showInputError(popupInput, errorMessage) {
    const popupError = this._form.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(this._validationParams.inputErrorClass);
    popupError.textContent = errorMessage;
  };

  _hideInputError(popupInput) {
    const popupError = this._form.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(this._validationParams.inputErrorClass);
    popupError.textContent = '';
  };

}
