export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(item) {
    this._container.append(item);
  }
}



/* только экземпляр класса Section должен вставлять карточки в DOM.
Для этого нужно сделать еще один метод prependItem */

/* Экземпляр класса Section нужно создать только 1 раз в теле файла,
чтобы он один добавлял новые карточки в DOM и отрисовывал начальный массив */

/* this._container.append(item);
Можно было бы сделать функцию renderer обычной функцией создания карточки
(без вставки ее в DOM), тогда в методе addItem можно было бы сразу создавать
карточку и тут же вставлять ее в DOM. Тогда в index.js не нужно было бы отдельно
создавать функцию createCard, чтобы в 2х местах создавать карточки.

 addItem(item) {
    const card = this._renderer(item)
    this._container.prepend(card);
  } */


