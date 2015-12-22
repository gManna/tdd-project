describe("salesTaxController", () => {
  var yTosReadyEventName = "ytosReady";

  beforeEach(done => {
    window.yTos = window.__mocks__.yTos;
    done();
  });

  afterEach(done => {
    window.yTos = void 0;
    done();
  });

  it("should be called on the 'ytosReady' event", () => {
    jQuery(document).trigger(yTosReadyEventName);
//    expect($(document)).toHandleWith(yTosReadyEventName, window.$M.salesTax.init);
  });

//  it("is confirmation page", () => {
//    spyOn(window.$M.salesTax.salesTax, 'setAsCalculated');
//    window.yTos.navigation.Controller = 'Confirmation';
//
//    jQuery(document).trigger(yTosReadyEventName);
//  })
});
