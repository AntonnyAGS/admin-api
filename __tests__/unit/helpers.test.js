'use strict';

const { validateEmail } = require('../../src/helpers');

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
});
