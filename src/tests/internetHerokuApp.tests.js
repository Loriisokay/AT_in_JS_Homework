const NotificationMessagePage = require('./../po/pages/notificationMessage.page');
const EntryAdPage = require('./../po/pages/entryAd.page');
const BrokenImagesPage = require('./../po/pages/brokenImages.page');
const DynamicContentPage = require('./../po/pages/dynamicContent.page');
const notificationMessagePage = new NotificationMessagePage();
const entryAdPage = new EntryAdPage();
const brokenImagesPage = new BrokenImagesPage();
const dynamicPageContent = new DynamicContentPage();

describe('notification message', () => {
    const successMessage = 'Action successful';
    const failMessage = 'Action unsuccesful, please try again';

    beforeEach(async () => {
        await notificationMessagePage.open();
    });

    it('should have the correct heading', async () => {
        const notificationPageHeading = 'Notification Message';
        await expect(notificationMessagePage.heading).toHaveText(notificationPageHeading);
    });

    it('should not display the notification before clicking', async () => {
        await expect(notificationMessagePage.flash).not.toBeExisting();
    });

    it('should render the correct notification message on click', async () => {
        await notificationMessagePage.waitBeforeClick(1000, notificationMessagePage.clickBtn);
        await expect(notificationMessagePage.flash).toHaveTextContaining([successMessage, failMessage]);
    });

    it('should rerender the message on click', async () => {
        await notificationMessagePage.waitBeforeClick(1000, notificationMessagePage.clickBtn);;
        await expect(notificationMessagePage.flash).toHaveTextContaining([successMessage, failMessage]);
        let isRerendered = false;
        let newText = '';
        const initialText = await notificationMessagePage.flash.getText();

        for (let i = 0; i < 20; i++) {
            await notificationMessagePage.waitBeforeClick(1000, notificationMessagePage.clickBtn);
            newText = await notificationMessagePage.flash.getText();

            if (newText !== initialText) {
                isRerendered = true;
                break;
            };
        };

        await expect(isRerendered).toEqual(true);
    });
});

describe('entry add', () => {
    beforeEach(async () => {
        await entryAdPage.open();
    });

    it('should have the correct heading', async () => {
        const entryAdPageHeading = 'Entry Ad';
        await expect(entryAdPage.heading).toHaveText(entryAdPageHeading);
    });

    it('should display the modal window when the page is opened', async () => {
        await entryAdPage.pauseBeforeContinue(1000);
        const isDisplayed = await entryAdPage.modalWindow.isDisplayed();
        await expect(isDisplayed).toBe(true);
    });

    it('should not display the window after the close button is clicked', async () => {
        await entryAdPage.pauseBeforeContinue(1000);
        await entryAdPage.waitBeforeClick(1000, entryAdPage.closeBtn);
        const isDisplayed = await entryAdPage.modalWindow.isDisplayed();
        await expect(isDisplayed).toBe(false);
    });

    it('should re-enable the window on click', async () => {
        await entryAdPage.pauseBeforeContinue(1000);
        await entryAdPage.waitBeforeClick(1000, entryAdPage.closeBtn);
        await entryAdPage.waitBeforeClick(1000, entryAdPage.clickBtn);
        const isReenabled = await entryAdPage.modalWindow.waitForDisplayed({timeout: 5000});
        await expect(isReenabled).toBe(true);
    });
});

describe('broken images', () => {
    beforeEach(() => {
        brokenImagesPage.open();
    });

    it('should have the correct heading', async () => {
        const brokenImagesPageHeading = 'Broken Images';
        await expect(brokenImagesPage.heading).toHaveText(brokenImagesPageHeading);
    });

    it('should not display the first image due to the path problem', async () => {
        const firstImageAttribute = await brokenImagesPage.images[1].getAttribute('src');
        const correctAttribute = 'img/asdf.jpg';
        await expect(firstImageAttribute).not.toEqual(correctAttribute);
    });

    it('should not display the second image due to the path problem', async () => {
        const secondImageAttribute = await brokenImagesPage.images[2].getAttribute('src');
        const correctAttribute = 'img/hjkl.jpg';
        await expect(secondImageAttribute).not.toEqual(correctAttribute);
    });

    it('should display the third image correctly', async () => {
        const thirdImageAttribute = await brokenImagesPage.images[3].getAttribute('src');
        const correctAttribute = 'img/avatar-blank.jpg';
        await expect(thirdImageAttribute).toEqual(correctAttribute);
    });
});

describe('dynamic content', () => {
    beforeEach(async () => {
        await dynamicPageContent.open('/dynamic_content');
    })

    it('should have the correct heading', async () => {
        const dynamicContentPageHeading = 'Dynamic Content';
        await expect(dynamicPageContent.heading).toHaveText(dynamicContentPageHeading);
    });

    it('should change the content of 3 paragraphs when refreshed', async () => {
        const initialText1 = await dynamicPageContent.changingParagraphs[1].getText();
        const initialText2 = await dynamicPageContent.changingParagraphs[2].getText();
        const initialText3 = await dynamicPageContent.changingParagraphs[3].getText();
        await browser.refresh();
        const finalText1 = await dynamicPageContent.changingParagraphs[1].getText();
        const finalText2 = await dynamicPageContent.changingParagraphs[2].getText();
        const finalText3 = await dynamicPageContent.changingParagraphs[3].getText();
        await expect(initialText1).not.toEqual(finalText1);
        await expect(initialText2).not.toEqual(finalText2);
        await expect(initialText3).not.toEqual(finalText3);
    });

    it('should fix the content of 1 and 2 paragraphs on click', async () => {
        const initialText1 = 'Accusantium eius ut architecto neque vel voluptatem vel nam eos minus ullam dolores voluptates enim sed voluptatem rerum qui sapiente nesciunt aspernatur et accusamus laboriosam culpa tenetur hic aut placeat error autem qui sunt.';
        const initialText2 = 'Omnis fugiat porro vero quas tempora quis eveniet ab officia cupiditate culpa repellat debitis itaque possimus odit dolorum et iste quibusdam quis dicta autem sint vel quo vel consequuntur dolorem nihil neque sunt aperiam blanditiis.';
        const initialText3 = await dynamicPageContent.changingParagraphs[3].getText();
        await dynamicPageContent.waitBeforeClick(1000, dynamicPageContent.fixBtn);
        await browser.refresh();
        const finalText1 = await dynamicPageContent.changingParagraphs[1].getText();
        const finalText2 = await dynamicPageContent.changingParagraphs[2].getText();
        const finalText3 = await dynamicPageContent.changingParagraphs[3].getText();
        await expect(initialText1).toEqual(finalText1);
        await expect(initialText2).toEqual(finalText2);
        await expect(initialText3).not.toEqual(finalText3);
    });

    it('should fix the content of 1 and 2 paragraphs when link is edited', async () => {
        await dynamicPageContent.open('/dynamic_content?with_content=static');
        const initialText1 = 'Accusantium eius ut architecto neque vel voluptatem vel nam eos minus ullam dolores voluptates enim sed voluptatem rerum qui sapiente nesciunt aspernatur et accusamus laboriosam culpa tenetur hic aut placeat error autem qui sunt.';
        const initialText2 = 'Omnis fugiat porro vero quas tempora quis eveniet ab officia cupiditate culpa repellat debitis itaque possimus odit dolorum et iste quibusdam quis dicta autem sint vel quo vel consequuntur dolorem nihil neque sunt aperiam blanditiis.';
        const initialText3 = await dynamicPageContent.changingParagraphs[3].getText();
        await dynamicPageContent.waitBeforeClick(1000, dynamicPageContent.fixBtn);
        await browser.refresh();
        const finalText1 = await dynamicPageContent.changingParagraphs[1].getText();
        const finalText2 = await dynamicPageContent.changingParagraphs[2].getText();
        const finalText3 = await dynamicPageContent.changingParagraphs[3].getText();
        await expect(initialText1).toEqual(finalText1);
        await expect(initialText2).toEqual(finalText2);
        await expect(initialText3).not.toEqual(finalText3);
    });
});




