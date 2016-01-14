"use strict";

xdescribe("cookie status", () => {
  var
    salesTax,
    cookieKey = "SalesTaxesAlreadyCalculated"
  ;

  beforeEach(done => {
    var container = $('<div />', {
      id: 'stax'
    }).appendTo('body');

    salesTax = new SalesTax(container);

    window.yTos = window.__mocks__.yTos;
    done();
  });

  afterEach(done => {
    salesTax = void 0;
    window.yTos = void 0;
    done();
  });

  it("should has 'cookieKey' property", () => {
    expect(typeof salesTax.cookieKey).toBe("string");
  });

  it("should has 'areCalculated' method", () => {
    expect(typeof salesTax.areCalculated).toBe("function");
  });

  it("should has 'areFree' method", () => {
    expect(typeof salesTax.areFree).toBe("function");
  });

  it("'areFree' should call '<jQuery>.addClass' method", () => {

    spyOn(salesTax.container, "hasClass");
    salesTax.areFree();
    expect(salesTax.container.hasClass).toHaveBeenCalled();
    expect(salesTax.container.hasClass).toHaveBeenCalledWith("wrap-free");

  });

  it("'areFree' should return false", () => {

    expect(salesTax.areFree()).toBeFalsy();

  });

  it("'areFree' should return true", () => {
    salesTax.container.addClass("wrap-free");
    expect(salesTax.areFree()).toBeTruthy();

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
