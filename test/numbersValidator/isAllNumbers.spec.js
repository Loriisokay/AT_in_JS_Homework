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
    const validationResults = validator.isAllNumbers([0, 1, 2, 3, 4]);
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
    const validationResults = validator.isAllNumbers([0, 1, 2, 'not a number']);
    expect(validationResults).to.be.equal(false);
  });

  it('should return false if provided with an array containing a boolean', () => {
    const validationResults = validator.isAllNumbers([0, 1, 2, true]);
    expect(validationResults).to.be.equal(false);
  });

  it('should return false if provided with an array containing an object', () => {
    const validationResults = validator.isAllNumbers([0, 1, 2, { not: 'an array' }]);
    expect(validationResults).to.be.equal(false);
  });

  it('should throw an error if not provided with a string instead of an array', () => {
    const check = 2;
    expect(() => {
      validator.isAllNumbers(check);
    }).to.throw(`[${check}] is not an array`);
  });
});
