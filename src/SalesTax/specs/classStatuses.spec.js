"use strict";

describe("cookie status", () => {
  var
    salesTax,
    cookieKey = "SalesTaxesAlreadyCalculated"
  ;

  beforeEach(done => {
    salesTax = new SalesTax();
    window.yTos = window.__mocks__.yTos;
    done();
  });

  it("should has 'cookieKey' property", () => {
    expect(typeof salesTax.cookieKey).toBe("string");
  });

  it("should has 'areCalculated' method", () => {
    expect(typeof salesTax.areCalculated).toBe("function");
  });

  it("'areCalculated' should call 'yTos.cookie.get' method", () => {

    spyOn(window.yTos.cookie, "get");
    salesTax.areCalculated();
    expect(window.yTos.cookie.get).toHaveBeenCalledWith(cookieKey);
  });

  it("'setAsCalculated' should call 'yTos.cookie.set' method", () => {
    var value = "";
    spyOn(window.yTos.cookie, "set");

    salesTax.setAsCalculated(value);
    expect(window.yTos.cookie.set).toHaveBeenCalledWith(cookieKey, value);
  });

  it("'setAsCalculated' should call 'yTos.cookie.set' method with default params", () => {
    spyOn(window.yTos.cookie, "set");

    salesTax.setAsCalculated();
    expect(window.yTos.cookie.set).toHaveBeenCalledWith(cookieKey, true);
  });


});
