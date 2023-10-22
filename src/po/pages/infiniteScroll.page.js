const BasePage = require('./base.page');

class InfiniteScrollPage extends BasePage {
  get heading() { return $('h3') };
  get addedContent() { return $$('.jscroll-added') };

  async open() {
    await super.open('/infinite_scroll');
  };
};

module.exports = InfiniteScrollPage;