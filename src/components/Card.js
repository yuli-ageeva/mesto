export default class Card {
  constructor({
                _id,
                name,
                link,
                likes,
                owner
              }, userId, cardTemplate, handleLikeCard, handleCardClick, handleDeleteButtonClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._ownerId = owner._id
    this._userId = userId;
    this._cardTemplate = cardTemplate;
    this._handleLikeCard = handleLikeCard;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate).content.querySelector('.places__card').cloneNode(true);
  }

  generateCard() {
    this._view = this._getTemplate();
    this._cardImage = this._view.querySelector('.places__image');
    this._placesLike = this._view.querySelector('.places__like');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._view.querySelector('.places__name').textContent = this._name;
    this._setEventListeners();
    this._likeCounter = this._view.querySelector('.places__like-number');
    this._renderLikes();
    if (this._ownerId !== this._userId) {
      this._hideDeleteButton()
    }
    return this._view;
  }

  _setEventListeners() {
    this._placesLike.addEventListener("click", () =>
      this._handleLikeCard(this, this._id, this.isLiked));
    this._view.querySelector('.places__button_delete').addEventListener('click', () => this._handleDeleteButtonClick(this));
    this._view.querySelector('.places__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }


  _hideDeleteButton() {
    this._view.querySelector('.places__button_delete').remove();
  }

  setLikes(likes) {
    if (!likes) {
      return
    }
    this._likes = likes
    this._renderLikes();
  }

  isLiked() {
    return this._likes.some(user => user._id === this._userId);
  }


  remove() {
    this._view.remove();
  }

  getId() {
    return this._id
  }

  _renderLikes() {
    if (this.isLiked()) {
      this._placesLike.classList.add('places__like_active');
      this._likeCounter.textContent = this._likes.length;

    } else {
      this._placesLike.classList.remove('places__like_active');
      this._likeCounter.textContent = this._likes.length;
    }
  }
}
