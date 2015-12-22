window
  .$M
  .component('SalesTaxController', salesTaxController)
  .then(component => {

    window.jQuery(document).on('yTosReady', () => {
      window.$M.run(component);
    });

    return window.$M.study(component);
  })
  .then(($scope) => {
    $(document).trigger('yTosReady');

    console.log('\n\n\n\nSCOPE', $scope);
  })
  .fail(err => console.log('\n\n\nERROR\n\n\n'))
;

function salesTaxController($){
  var self = this;

  self.something = 'Hello World';
}
