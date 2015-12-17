class Menu {
  constructor() {
    this._isOpen = false;
    this.id = 'headerMenu';

    this.menu = jQuery('<ul />', {
      id: this.id
    });
  }

  get isClosed() {
    return !this._isOpen;
  }

  get isOpened() {
    return this._isOpen;
  }

  set isOpened(val) {
    this._isOpen = val;
  }

  get items() {
    return this.menu.children();
  }

  open() {
    this.isOpened = true;

    return this;
  }

  close() {
    this.isOpened = false;

    return this;
  }

  toggle() {
    if(this.isOpened){
      this.close();
    } else {
      this.open();
    }

    return this;
  }

  onItemClick(event) {
    console.log(event.type, event.target);

    return this;
  }

  addItem(item) {
    let element = jQuery('<li />', {
      class: ['headermenu-item headermenu-item-' + (this.items.length + 1)].concat(item.class || []),
      click: this.onItemClick
    });

    let link = jQuery('<a />', {
      text: item.title
    });

    element.html(link);
    this.menu.append(element);

    return this;
  }

  render(container) {

    return jQuery
      .when(this.menu)
      .then((menu) => {
        return jQuery(container).html(menu);
      });
  }
}
