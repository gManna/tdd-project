class Menu {
  constructor() {
    this._isOpen = false;
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

  open() {
    this.isOpened = true;
  }
  close() {
    this.isOpened = false;
  }
  toggle() {
    if(this.isOpened){
      return this.close();
    }

    return this.open();
  }
}
