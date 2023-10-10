describe('Add elements', () => {
  
  it('clicking "Add element" once should create 1 "Delete" button', async () => {
    await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');
    const add = $('div.example>button');
    const numberOfclicks = 1;
    await add.click();
    const addedElements = await $$('.added-manually');
    const addedElNumber = addedElements.length;

    expect(addedElNumber).toEqual(numberOfclicks);
  });

  it('clicking "Add element" 100 times should create 100 "Delete" buttons', async () => {
    await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');
    const add = $('div.example>button');
    const numberOfclicks = 100;

    for (let i = 0; i < numberOfclicks; i++) {
      await add.click();
    }
    
    const addedElements = await $$('.added-manually');
    const addedElNumber = addedElements.length;

    expect(addedElNumber).toEqual(numberOfclicks);
  });

});

describe('Remove Elements', () => {

  it('Clicking "Delete button" once should delete one element', async () => {
    await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');
    const add = $('div.example>button');
    await add.click();
    const deleteButton = await $('div#elements>button');
    await deleteButton.click();
    const elementExists = await deleteButton.isExisting();

    expect(elementExists).toBe(false);
  });

  it('Clicking "Delete button" once should delete one element', async () => {
    await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');
    const add = $('div.example>button');
    const clickNumber = 10;

    for (let i = 0; i < clickNumber; i++) {
      await add.click();
    }
    
    const deleteButtons = await $$('div#elements>button');
    const oldDeletesNumber = deleteButtons.length;
    await deleteButtons[0].click();
    const newDeleteButtons = await $$('div#elements>button');
    const newDeletesNumber = newDeleteButtons.length;
  
    expect(oldDeletesNumber === newDeletesNumber + 1).toBe(true);
  });

  it('Clicking "Delete button" should delete all added elements', async () => {
    await browser.url('https://the-internet.herokuapp.com/add_remove_elements/');
    const add = $('div.example>button');
    const clickNumber = 10;

    for (let i = 0; i < clickNumber; i++) {
      await add.click();
    }

    const deleteButtons = $$('div#elements>button')
    
    for (let i = 0; i < clickNumber; i++) {
      await deleteButtons[0].click();
    }

    const elementsExist = await deleteButtons[0].isExisting();

    expect(elementsExist).toEqual(false);
  });
  
});