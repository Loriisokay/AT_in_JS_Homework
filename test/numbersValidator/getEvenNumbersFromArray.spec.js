const { expect } = require('chai');
const NumbersValidator = require('../../app/numbers_validator.js');

describe('getEvenNumbersFromArray positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return an array of even numbers when provided with an array of odd and even numbers', () => {
    const validationResults = validator.getEvenNumbersFromArray([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(validationResults).to.be.eql([2, 4, 6, 8]);
  });

  it('should return an array of even numbers when provided with an array of even numbers', () => {
    const validationResults = validator.getEvenNumbersFromArray([2, 4, 6, 8]);
    expect(validationResults).to.be.eql([2, 4, 6, 8]);
  });
});

describe('getEvenNumbersFromArray negative tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should throw an error if provided with an integer', () => {
    const check = 2;
    expect(() => {
      validator.getEvenNumbersFromArray(check);
    }).to.throw(`[${check}] is not an array`);
  });

  it('should throw an error if provided with an array of strings and numbers', () => {
    const check = [1, '2', 3, '4'];
    expect(() => {
      validator.getEvenNumbersFromArray(check);
    }).to.throw(`[${check}] is not an array of "Numbers"`);
  });

  it('should throw an error if provided with an array of arrays and numbers', () => {
    const check = [[1, 1, 1], 4, 6, 8];
    expect(() => {
      validator.getEvenNumbersFromArray(check);
    }).to.throw(`[${check}] is not an array of "Numbers"`);
  });
});
