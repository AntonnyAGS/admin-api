'use strict';

const { validateEmail, generateToken, validateToken, generateRefreshToken, validateRefreshToken } = require('../../src/helpers');

let token = '';
let refreshToken = '';
beforeAll(() => {
  process.env.SECRET_HASH = 'banana';
  process.env.SECRET_REFRESH_HASH = 'bananana';
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
    token = generateToken({ id: 'mockid' });
    const response = !!token;
    expect(response).toBe(true);
  });
  it('Testing validate token', () => {
    const response = validateToken(token);
    expect(!!response).toBe(true);
  });
  it('Testing generating refresh token ', () => {
    refreshToken = generateRefreshToken();
    const response = !!token;
    expect(response).toBe(true);
  });
  it('Testing validate refresh token', () => {
    const response = validateRefreshToken(refreshToken);
    expect(!!response).toBe(true);
  });
});
