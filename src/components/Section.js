export default class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(item) {
    const renderedItem = this._renderer(item);
    this._container.prepend(renderedItem);
  }

}
