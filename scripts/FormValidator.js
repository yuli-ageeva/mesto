export default class FormValidator {
  constructor(validationParams, form) {
    this._validationParams = validationParams;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._validationParams.submitButtonSelector);
    this._popupInputs = Array.from(this._form.querySelectorAll(this._validationParams.inputSelector));

  }

  enableValidation() {
    this._setEventListeners();
  }

  hideErrors() {
    this._toggleButtonState();
    this._popupInputs.forEach((popupInput) => {
      this._hideInputError(popupInput);
    });
  }

  _setEventListeners() {
    this._popupInputs.forEach((popupInput) => {
      popupInput.addEventListener('input', () => {
        this._toggleInputState(popupInput);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    const formIsValid = this._popupInputs.every(inputElement => inputElement.validity.valid)
    if (formIsValid) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  };

  _toggleInputState(popupInput) {
    if (!popupInput.validity.valid) {
      this._showInputError(popupInput, popupInput.validationMessage);
    } else {
      this._hideInputError(popupInput);
    }
  };

  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._validationParams.inactiveButtonClass);
  };

  _disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._validationParams.inactiveButtonClass);
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
