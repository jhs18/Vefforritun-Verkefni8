const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {

    items = _items;
    _form.addEventListener('submit', formHandler);

    for (let item of items.querySelectorAll('.item')) {
      const checkbox = item.querySelector('.item__checkbox');
      const text = item.querySelector('.item__text');
      const button = item.querySelector('.item__button');

      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {

    e.preventDefault();
    console.log('halló heimur')

    const input = e.target.querySelector('.form__input');

    if (input.value.trim().length > 0) {
      add(input.value.trim());
    }
    input.value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {

    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {

    const {
      target
    }
    = e;

    const {
      textContent, parentNode
    }
    = target;

    const input = el('input', 'item__edit');
    const button = parentNode.querySelector('.item__button');

    input.setAttribute('type', 'text');
    input.value = textContent;
    input.addEventListener('keyup', commit);
    input.focus();

    parentNode.insertBefore(input, button);
    parentNode.removeChild(target);
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {

    const {
      keyCode, target
    }
    = e;

    if (keyCode !== ENTER_KEYCODE) {
      return;
    }

    const {
      value, parentNode
    }
    = target;

    const text = el('span', 'item__text', edit);
    const button = parentNode.querySelector('.item__button');

    target.removeEventListener('keyup', commit);
    parentNode.removeChild(target);
    text.appendChild(document.createTextNode(value));
    parentNode.insertBefore(text, button);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    const item = el('li', 'item');
    const checkbox = el('input', 'item__checkbox', finish);
    const text = el('span', 'item__text', edit);
    const button = el('button', 'item__button', deleteItem);

    checkbox.setAttribute('type', 'checkbox');
    button.appendChild(document.createTextNode('Eyða'));
    text.appendChild(document.createTextNode(value));
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(button);
    items.appendChild(item);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {

    const parent = e.target.parentNode;
    const checkbox = parent.querySelector('.item__checkbox');
    const text = parent.querySelector('.item__text');
    const button = parent.querySelector('.item__button');

    button.removeEventListener('click', deleteItem);
    text.removeEventListener('click', edit);
    checkbox.removeEventListener('click', finish);
    parent.parentNode.removeChild(parent);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {

    const element = document.createElement(type);
    if (className) {
      element.classList.add(className);
    }

    if (clickHandler) {
      element.addEventListener('click', clickHandler)
    }

    return element;
  }

  return {
    init: init
  }
})();
