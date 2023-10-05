const { expect } = require('chai');
const NumbersValidator = require('../../app/numbers_validator.js');

let validator;
beforeEach(() => {
  validator = new NumbersValidator();
});

afterEach(() => {
  validator = null;
});

describe('isInteger positive tests', () => {
  it('should return true if provided with a positive integer', () => {
    const check = 7;
    const validationResults = validator.isInteger(check);
    expect(validationResults).to.be.equal(true);
  });

  it('should return true if provided with a negative integer', () => {
    const check = -7;
    const validationResults = validator.isInteger(check);
    expect(validationResults).to.be.equal(true);
  });
});

describe('isInteger negative tests', () => {
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
