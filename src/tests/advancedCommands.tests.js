const FloatingMenuPage = require('../po/pages/floatingMenu.page');
const InfiniteScrollPage = require('../po/pages/infiniteScroll.page');
const KeyPressesPage = require('./../po/pages/keyPresses.page');
const JSErrorPage = require('./../po/pages/jsError.page');
const floatingMenuPage = new FloatingMenuPage;
const infiniteScrollPage = new InfiniteScrollPage;
const keyPressesPage = new KeyPressesPage;
const jSErrorPage = new JSErrorPage;


describe('test floating menu with execute()', () => {
  beforeEach(() => {
    floatingMenuPage.open();
  });

  it('should have the correct heading', async () => {
    const floatingMenuPageHeading = 'Floating Menu';
    await expect(floatingMenuPage.heading).toHaveText(floatingMenuPageHeading);
  });

  it('should be at the top when the page is loaded', async () => {
    const initialPosition = await floatingMenuPage.menu.getCSSProperty('top');
    const isDisplayed = await floatingMenuPage.menu.isDisplayed();
    await expect(isDisplayed).toBe(true);
    await expect(initialPosition.value).toEqual('0px');
  });

  it('should be sticky when the page is scrolled', async () => {
    const lastParagraphLocation = await floatingMenuPage.lastParagraph.getLocation();

    await browser.execute((x, y) => {
      window.scroll(x, y);
    }, lastParagraphLocation.x, lastParagraphLocation.y);

    const menuLocation = await floatingMenuPage.menu.getCSSProperty('top');
    let menuFinalLocation = menuLocation.value.split('px');
    const isDisplayed = await floatingMenuPage.menu.isDisplayed();
    await expect(isDisplayed).toBe(true);
    await expect(lastParagraphLocation.y > Number(menuFinalLocation[0]) && Number(menuFinalLocation[0]) > 0).toBe(true);
  });
});

describe('test infinite scroll with waitUntil()', () => {
  beforeEach(() => {
    infiniteScrollPage.open();
  });

  it('should have the correct heading', async () => {
    const infiniteScrollPageHeading = 'Infinite Scroll';
    await expect(infiniteScrollPage.heading).toHaveText(infiniteScrollPageHeading);
  });

  it('should add new content when the page is scrolled', async () => {
    let length = await infiniteScrollPage.addedContent.length;
    let scrolls = 100;

    for (let i = 0; i < scrolls; i++) {
      await browser.scroll(0, 100);
      infiniteScrollPage.addedContent.waitUntill(async () => {
        return await infiniteScrollPage.addedContent.length > length;
      }, { timeout: 3000 });
      length++;
    };

    await expect(length > scrolls).toBe(true);
  });
});

describe('test key presses with performActions()', () => {
  beforeEach(async () => {
    keyPressesPage.open();
  });

  it('should have the correct headding', async () => {
    const keyPressesHeading = 'Key Presses';
    await expect(keyPressesPage.heading).toHaveText(keyPressesHeading);
  });

  it('should track key presses', async () => {
    const arrayOfletters = ['A', 'B', 'C', 'D', 'E'];
    await keyPressesPage.input.click();

    for (const letter of arrayOfletters) {
      await browser.performActions([
        {
          type: 'key',
          id: 'keyboard',
          actions: [
            {
              type: 'keyDown',
              value: letter
            }
          ],
        },
      ]);
      const recievedResult = `You entered: ${letter}`;
      await expect(keyPressesPage.result).toHaveText(recievedResult);
    };
    await browser.releaseActions();   
  });
});

describe('test cookies on JS Error Page', () => {
  beforeEach(async () => {
    jSErrorPage.open();
  });

  it('should set cookies', async () => {
    const input = {
      name: 'cookie',
      value: 'lucky cookie'
    }
    await browser.setCookies([
      {
        name: input.name,
        value: input.value
      }
    ]);
    const result = await browser.getCookies([input.name]);
    await expect(result[0].value).toBe(input.value);
  });

  it('should delete cookies', async () => {
    const input = {
      name: 'cookie',
      value: 'lucky cookie'
    }
    await browser.setCookies([
      {
        name: input.name,
        value: input.value
      }
    ]);
    await browser.deleteCookies([input.name]);
    const result = await browser.getCookies();
    let cookieExists = result.some(cookie => cookie.name === input.name);
    await expect(cookieExists).toEqual(false);
  });
});







