'use strict';

const { validateEmail, generateToken } = require('../../src/helpers');

beforeAll(() => {
  process.env.SECRECT_HASH = 'banana';
});
describe('Helpers', () => {
  it('Testing validate email function', () => {
    const email = 'ant.dmcom.com';

    const response = validateEmail(email);

    expect(response).toBe(false);
  });
  it('Testing validate email function', () => {
    const email = 'banana@gmail.com';

    const response = validateEmail(email);

    expect(response).toBe(true);
  });
  it('Testing generating token', () => {
    const token = generateToken({ id: 'mockid' });
    const response = !!token;
    expect(response).toBe(true);
  });
});
