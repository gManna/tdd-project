class SalesTax {
  /**
   * @param {string|jQuery} [container = $()]
   * @Constructor
   */
  constructor(container) {

    /**
     *
     * @type {string}
     * @private
     */
    this._storageKey = "SalesTaxesAlreadyCalculated";
    this.container =  $(container);
  }

  /**
   * key used as cookie ID
   *
   * @type {string}
   */
  get cookieKey() {
    return this._storageKey;
  }

  /**
   *
   * @returns {boolean}
   */
  areFree() {
    return this.container.hasClass("wrap-free");
  }
  /**
   * checks if salesTax are already calculated
   * @returns {boolean}
   */
  areCalculated() {
    return !!window.yTos.cookie.get(this.cookieKey);
  }

  /**
   * sets if salesTax are calculated
   * @param {boolean} [value = true]
   */
  setAsCalculated(value = true) {
    window.yTos.cookie.set(this.cookieKey, value);
  }

}
