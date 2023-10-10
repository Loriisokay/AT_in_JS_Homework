describe('Checkbox tests', () => {

  it('should return true if the first checkbox is selected', async () => {
    await browser.url('https://the-internet.herokuapp.com/checkboxes');
    const checkboxes = await $$('form>input[type="checkbox"]');
    await checkboxes[0].click();
    const isCheckbox1Selected = await checkboxes[0].isSelected();
    
    expect(isCheckbox1Selected).toEqual(true);
  });  

  it('should return true if the second checkbox is selected', async () => {
    await browser.url('https://the-internet.herokuapp.com/checkboxes');
    const checkboxes = await $$('form>input[type="checkbox"]');
    const isCheckbox2Selected = await checkboxes[1].isSelected();
    
    expect(isCheckbox2Selected).toEqual(true);
  }); 

  it('should return true if both checkboxes are selected', async () => {
    await browser.url('https://the-internet.herokuapp.com/checkboxes');
    const checkboxes = await $$('form>input[type="checkbox"]');

    if (await !checkboxes[0].isSelected()) {
      await checkboxes[0].click();
    }
  
    if (await !checkboxes[1].isSelected()) {
      await checkboxes[1].click();
    }

    const isCheckbox1Selected = await checkboxes[1].isSelected();
    const isCheckbox2Selected = await checkboxes[1].isSelected();

    expect(isCheckbox1Selected).toEqual(true);
    expect(isCheckbox2Selected).toEqual(true);
  });

  it('should return false if both checkboxes are not selected', async () => {
    await browser.url('https://the-internet.herokuapp.com/checkboxes');
    const checkboxes = await $$('form>input[type="checkbox"]');
  
    if (await checkboxes[0].isSelected()) {
      await checkboxes[0].click();
    }
  
    if (await checkboxes[1].isSelected()) {
      await checkboxes[1].click();
    }
    
    const isCheckbox1Selected = await checkboxes[0].isSelected();
    const isCheckbox2Selected = await checkboxes[1].isSelected();
  
    expect(isCheckbox1Selected).toEqual(false);
    expect(isCheckbox2Selected).toEqual(false);
  });
  
});