const BasePage = require('./base.page');

class KeyPressesPage extends BasePage {
  get heading() { return $('h3') };
  get input() { return $('#target') };
  get result() { return $('#result') };

  async open() {
    await super.open('/key_presses');
  };
};

module.exports = KeyPressesPage;