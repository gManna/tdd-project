class SalesTax {
  /**
   * @Constructor
   */
  constructor() {
    /**
     *
     * @type {string}
     * @private
     */
    this._storageKey = "SalesTaxesAlreadyCalculated";
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
