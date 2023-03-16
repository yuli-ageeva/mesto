export default class Card {
  constructor(name, link, openPopupFunction) {
    this._name = name;
    this._link = link;
    this._cardTemplate = document.querySelector('#card').content;
    this._openPopupFunction = openPopupFunction;
  }

  generateCard() {
    this._view = this._cardTemplate.querySelector('.places__card').cloneNode(true);
    const cardImage = this._view.querySelector('.places__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;
    this._view.querySelector('.places__name').textContent = this._name;
    this._setEventListeners();
    return this._view;
  }

  _setEventListeners() {
    this._view.querySelector('.places__like').addEventListener('click', () => this._like());
    this._view.querySelector('.places__button_delete').addEventListener('click', () => this._remove());
    this._view.querySelector('.places__image').addEventListener('click', () => this._zoom());
  }

  _like() {
    this._view.querySelector('.places__like').classList.toggle('places__like_active');
  }

  _remove() {
    this._view.remove();
  }

  _zoom() {
    const popupZoom = document.querySelector('.popup_zoom');
    const popupZoomImage = popupZoom.querySelector('.popup__image');
    popupZoomImage.src = this._link;
    popupZoomImage.alt = this._name;
    popupZoom.querySelector('.popup__caption').textContent = this._name;
    this._openPopupFunction.call(null,popupZoom);
  }
}
