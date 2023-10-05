const { expect } = require('chai');
const NumbersValidator = require('../../app/numbers_validator.js');

describe('isAllNumbers positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when provided with an array', () => {
    const check = [0, 1, 2, 3, 4];
    const validationResults = validator.isAllNumbers(check);
    expect(validationResults).to.be.equal(true);
  });
});

describe('isAllNumbers negative tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return false if provided with an array containing a string', () => {
    const check = [0, 1, 2, 'not a number'];
    const validationResults = validator.isAllNumbers(check);
    expect(validationResults).to.be.equal(false);
  });

  it('should return false if provided with an array containing a boolean', () => {
    const check = [0, 1, 2, true];
    const validationResults = validator.isAllNumbers(check);
    expect(validationResults).to.be.equal(false);
  });

  it('should return false if provided with an array containing an object', () => {
    const check = [0, 1, 2, { not: 'an array' }];
    const validationResults = validator.isAllNumbers(check);
    expect(validationResults).to.be.equal(false);
  });

  it('should throw an error if not provided with a string instead of an array', () => {
    const check = 2;
    expect(() => {
      validator.isAllNumbers(check);
    }).to.throw(`[${check}] is not an array`);
  });
});
