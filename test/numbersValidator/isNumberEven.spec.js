const { expect } = require('chai');
const NumbersValidator = require('../../app/numbers_validator.js');

describe('isNumberEven positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when provided with an even number', () => {
    const check = 4;
    const validationResults = validator.isNumberEven(check);
    expect(validationResults).to.be.equal(true);
  });
});

describe('isNumberEven negative tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return false when provided with an even number', () => {
    const check = 3;
    const validationResults = validator.isNumberEven(check);
    expect(validationResults).to.be.equal(false);
  });

  it('should throw an error if provided with a string', () => {
    const check = '4';
    expect(() => {
      validator.isNumberEven(check);
    }).to.throw(`[${check}] is not of type "Number" it is of type "string"`);
  });

  it('should throw an error if provided with a boolean', () => {
    const check = true;
    expect(() => {
      validator.isNumberEven(check);
    }).to.throw(`[${check}] is not of type "Number" it is of type "boolean"`);
  });

  it('should throw an error if provided with an array', () => {
    const check = [4, 6, 8];
    expect(() => {
      validator.isNumberEven(check);
    }).to.throw(`[${check}] is not of type "Number" it is of type "object"`);
  });
});
