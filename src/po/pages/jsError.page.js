const BasePage = require('./base.page');

class JSErrorPage extends BasePage {
  async open() {
    await super.open('/javascript_error');
  };
};

module.exports = JSErrorPage;