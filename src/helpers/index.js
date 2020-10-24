'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  validateEmail: (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
  },
  generateToken: (params = {}) => {
    return jwt.sign(params, process.env.SECRECT_HASH, {
      expiresIn: '30d'
    });
  }
};
