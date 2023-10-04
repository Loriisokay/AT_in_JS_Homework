const { expect } = require('chai');
const NumbersValidator = require('../../app/numbers_validator.js');

describe('isInteger positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true if provided with an integer', () => {
    const validationResults = validator.isInteger(7);
    expect(validationResults).to.be.equal(true);
  });

  it('should return true if provided with an integer', () => {
    const validationResults = validator.isInteger(-7);
    expect(validationResults).to.be.equal(true);
  });
});

describe('isInteger negative tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should throw an error if provided with a string', () => {
    const check = '7';
    expect(() => {
      validator.isInteger(check);
    }).to.throw(`[${check}] is not a number`);
  });

  it('should throw an error if provided with a boolean', () => {
    const check = true;
    expect(() => {
      validator.isInteger(check);
    }).to.throw(`[${check}] is not a number`);
  });

  it('should throw an error if provided with an array', () => {
    const check = ['1', 2];
    expect(() => {
      validator.isInteger(check);
    }).to.throw(`[${check}] is not a number`);
  });
});
