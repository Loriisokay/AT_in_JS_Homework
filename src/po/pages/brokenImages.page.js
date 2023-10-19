const BasePage = require('./base.page');

class BrokenImagesPage extends BasePage {
  get heading() { return $('h3') };
  get images() { return $$('img') };

  async open() {
    await super.open('/broken_images');
  };
};

module.exports = BrokenImagesPage;