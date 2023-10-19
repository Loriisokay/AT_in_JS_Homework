const BasePage = require('./base.page');


class NotificationMessagePage extends BasePage {
  get heading() { return $('h3') };
  get flash() { return $('#flash') };
  get clickBtn() { return $('#content > div > p > a') };

  async open() {
    await super.open('/notification_message_rendered');
  };
};

module.exports = NotificationMessagePage;