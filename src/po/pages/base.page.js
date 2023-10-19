class BasePage {

  async open(path) {
    await browser.url(path)
  };

  async waitBeforeClick(n, button) {
    await browser.pause(n);
    await button.click();
  };

  async pauseBeforeContinue(n) {
    await browser.pause(n);
  };

};

module.exports = BasePage;