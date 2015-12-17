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

describe("menuRendering", () => {
  var headerMenu, container, menuData;

  beforeEach(done => {
    menuData = [
      {
        title: 'Item 1',
        link: 'http://republica.it'
      }
    ];
    headerMenu = new Menu();
    container = $('<nav />').appendTo($('body'));
    headerMenu.render(container);
    done();
  });

  it("should has a 'render' Method", () => {
    expect(typeof headerMenu.render).toBe("function");
  });

  it("should has a 'addItem' method", () => {
    expect(typeof headerMenu.addItem).toBe("function");
  });

  it("should add items based on data", () => {
    menuData.forEach((item, index) => {
      headerMenu.addItem(item);
    });
  });

  it("items should handle click", () => {
    menuData.forEach((item, index) => {
      headerMenu.addItem(item);
    });

    let item = headerMenu.items.get(0);

    $(item).click()
  });

});
