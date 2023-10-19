const BasePage = require('./base.page');

class DynamicContentPage extends BasePage {
  get heading() { return $('h3') };
  get fixBtn() { return $('.example > p > a') };
  get changingParagraphs() { return $$('.large-10') };

  async open(path) {
    await super.open(path);
  };
};

module.exports = DynamicContentPage;