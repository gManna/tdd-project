'use strict';

describe("class SalesTax definition", () => {

  it("should be defined in the 'windows' scope", () => {
    expect(window.SalesTax).toBeDefined();
    expect(SalesTax).toBeDefined();
  });
  it("should be impossible to call it as a normal function", () => {
    expect(() => window.SalesTax()).toThrow();
  });

  it("create a SalesTax instance and assign it to the var salesTax", () => {
    var salesTax = new SalesTax();

    expect(salesTax).toEqual(jasmine.any(SalesTax));
    expect(salesTax instanceof SalesTax).toBeTruthy();
  });
});


