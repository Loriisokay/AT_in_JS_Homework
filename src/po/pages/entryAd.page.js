const BasePage = require('./base.page');
class EntryAdPage extends BasePage {
  get heading() { return $('h3') };
  get clickBtn() { return $('.example > p > #restart-ad') };
  get modalWindow() { return $('.modal') };
  get closeBtn() { return $('.modal-footer > p') };

  async open() {
    await super.open('/entry_ad');
  };

};

module.exports = EntryAdPage;