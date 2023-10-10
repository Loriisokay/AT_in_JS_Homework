describe('Number input positive test', () => {

  it('input field should accept positive numbers', async () => {
    await browser.url('https://the-internet.herokuapp.com/inputs');
    const input = $('//input');
    const inputValue = 10;
    input.clearValue();
    await input.setValue(inputValue);
    const recievedValue = input.getValue();
  
    expect(await recievedValue).toEqual(`${inputValue}`);
    expect(await browser.execute((input) => {
      return isNaN(Number(input));
    }, Number(recievedValue))).toEqual(false);
  });  

  it('input field should accept negative numbers', async () => {
    await browser.url('https://the-internet.herokuapp.com/inputs');
    const input = $('//input');
    const inputValue = -10;
    input.clearValue();

    await input.setValue(inputValue);
    const recievedValue = input.getValue();

    expect(await recievedValue).toBe(`${inputValue}`);
    expect(await browser.execute((input) => {
      return isNaN(Number(input));
    }, Number(recievedValue))).toEqual(false);
  });

  it('input value can be edited', async () => {
    await browser.url('https://the-internet.herokuapp.com/inputs');
    const input = $('//input');
    const inputValue = 10;
    const newInputValue = 3;
    input.clearValue();

    await input.setValue(inputValue);
    await input.addValue(newInputValue);
    const recievedValue = input.getValue();

    expect(await recievedValue).toEqual(`${inputValue}${newInputValue}`);
    expect(await browser.execute((input) => {
      return isNaN(Number(input));
    }, Number(recievedValue))).toEqual(false);
  });

});

describe('Number input negative tests', () => {

  it('input field should not accept alphabetical values', async () => {
    await browser.url('https://the-internet.herokuapp.com/inputs');
    const input = $('//input');
    const inputValue = 'abc';
    input.clearValue();
    await input.setValue(inputValue);
    const recievedValue = input.getValue();

    expect(await browser.execute((input) => {
      return isNaN(Number(input));
    }, recievedValue)).toEqual(true);
  });

  it('input field should not accept alphanumeric values', async () => {
    await browser.url('https://the-internet.herokuapp.com/inputs');
    const input = $('//input');
    const inputValue = 'abc123';
    input.clearValue();
    await input.setValue(inputValue);
    const recievedValue = input.getValue();

    expect(await browser.execute((input) => {
      return isNaN(Number(input));
    }, recievedValue)).toEqual(true);
  });

});