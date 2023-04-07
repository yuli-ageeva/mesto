export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderInitialItems(){
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem (elm){
    this._container.prepend(elm);
  }
}
