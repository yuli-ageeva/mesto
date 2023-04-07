export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._view = this._getTemplate();
    this._cardImage = this._view.querySelector('.places__image');
    this._placesLike = this._view.querySelector('.places__like');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._view.querySelector('.places__name').textContent = this._name;
    this._setEventListeners();
    return this._view;
  }

  _setEventListeners() {
    this._placesLike.addEventListener('click', () => this._like());
    this._view.querySelector('.places__button_delete').addEventListener('click', () => this._remove());
    this._view.querySelector('.places__image').addEventListener('click', () => this._handleCardClick(this._link,this._name));
  }

  _like() {
    this._placesLike.classList.toggle('places__like_active');
  }

  _remove() {
    this._view.remove();
  }

}
