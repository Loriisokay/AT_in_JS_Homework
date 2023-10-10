describe('Dropdown tests', () => {

  it('should be enabled', async () => {
    await browser.url('https://the-internet.herokuapp.com/dropdown');
    const dropdown = $('#dropdown');
    const isDropdownEnabled = await dropdown.isEnabled();

    expect(isDropdownEnabled).toEqual(true);
  });

  it('should have the value of 1 if the first option is chosen', async () => {
    await browser.url('https://the-internet.herokuapp.com/dropdown');
    const dropdown = $('#dropdown');
    await dropdown.selectByVisibleText('Option 1');
    const selectedValue = await dropdown.getValue();

    expect(selectedValue).toEqual('1');
  });

  it('should have the value of 2 if the first option is chosen', async () => {
    await browser.url('https://the-internet.herokuapp.com/dropdown');
    const dropdown = $('#dropdown');
    await dropdown.selectByVisibleText('Option 2');
    const selectedValue = await dropdown.getValue();

    expect(selectedValue).toEqual('2');
  });

});