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
  });

  it("is confirmation page", () => {
    window.yTos.navigation.Controller = 'Confirmation';

    jQuery(document).trigger(yTosReadyEventName);
  })
});
