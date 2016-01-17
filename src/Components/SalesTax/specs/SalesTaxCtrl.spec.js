"use strict";

import $M from 'window/$M';
import $ from 'window/jQuery';
import '../mocks/yTos.mock.js';


describe("salesTaxController", () => {
  var yTosReadyEventName = "yTosReady";

  beforeEach(done => {
    window.yTos = window.__mocks__.yTos;
    done();
  });

  afterEach(done => {
    window.yTos = void 0;
    done();
  });

  it("should have a SalesTaxCtrl module registered", () => {
    var isSalesTaxCtrlRegistered = $M.hasSync('SalesTaxCtrl');

    expect(isSalesTaxCtrlRegistered).toBeTruthy();
  });

  it("should be ran on the 'ytosReady' event", (done) => {



    $M
      .yTosReady('SalesTaxCtrl')
      .then(function(module) {
        expect(this.state()).toBe('resolved');
        return $M.inspect(module);
      })
      .then(function(scope) {
        expect(scope.something).toEqual('Hello World');
      })
      .always(function() {
        done()
      })
    ;

    $(document).trigger(yTosReadyEventName);
  });
});
