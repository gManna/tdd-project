describe("create Menu", () => {

  it("var headerMenu should be undefined", () => {
    expect(Menu).toBeDefined();
  });

  it("create a menu instance and assign it to var headerMenu", () => {
    var headerMenu = new Menu();

    expect(headerMenu).toEqual(jasmine.any(Menu));
  });

});

describe("Menu Members", () => {
  var headerMenu;

  beforeEach(done => {
    headerMenu = new Menu();
    done();
  });

  it("should be closed", () => {
    expect(headerMenu.isOpened).toBeFalsy();
  });

  it("should has a 'open' method", () => {
    expect(typeof headerMenu.open).toBe("function");
  });

  it("should be opened", () => {
    headerMenu.open();

    expect(headerMenu.isOpened).toBeTruthy();
  });

  it("should be call 'open' method if is closed ", () => {
   spyOn(headerMenu, "open").and.callThrough();

    headerMenu.toggle();

    expect(headerMenu.open).toHaveBeenCalled();
    expect(headerMenu.isOpened).toBeTruthy();
  });

  it("should be call 'close' method if is opened ", () => {
   spyOn(headerMenu, "close").and.callThrough();

    headerMenu.open();
    expect(headerMenu.isOpened).toBeTruthy();

    headerMenu.toggle();
    expect(headerMenu.close).toHaveBeenCalled();
    expect(headerMenu.isClosed).toBeTruthy();
  });
});
