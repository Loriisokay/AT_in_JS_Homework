const BasePage = require('./base.page');

class FloatingMenuPage extends BasePage {
  get heading() { return $('h3') };
  get menu() { return $('#menu') };
  get lastParagraph() { return $('.scroll p:last-child')}

  async open() {
    await super.open('/floating_menu');
  };
};

module.exports = FloatingMenuPage;