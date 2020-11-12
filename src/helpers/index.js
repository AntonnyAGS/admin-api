'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  validateEmail: (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
  },
  generateToken: (params = {}) => {
    return jwt.sign(params, process.env.SECRET_HASH, {
      expiresIn: '1h'
    });
  },
  generateRefreshToken: (params = {}) => {
    return jwt.sign(params, process.env.SECRET_REFRESH_HASH, {
      expiresIn: '7d'
    });
  },
  validateToken: (token) => {
    return jwt.verify(token, process.env.SECRET_HASH, (error, decode) => {
      if (error) {
        //eslint-disable-next-line
        console.log(error);
        return false;
      };
      return { id: decode.id, isAdmin: decode.isAdmin };
    });
  },
  printMembersName: (accumulator, value, i, arr) => {
    const text = arr.length-1 === i ? `${accumulator} e ${value}` : `${accumulator}, ${value},`;

    return arr.length === 1 ? value : text;
  },
  validateRefreshToken: (token) => {
    return jwt.verify(token, process.env.SECRET_REFRESH_HASH, (error) => {
      if (error) {
        //eslint-disable-next-line
        console.log(error);
        return false;
      };
      return true;
    });
  }
}