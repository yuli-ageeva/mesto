import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector('.popup__confirm-button');
  }

  open(onConfirm) {
    this._onConfirm = onConfirm;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', () => {
      this._onConfirm()
      this.close();
    })

  }
}
