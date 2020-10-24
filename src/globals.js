'use strict';

module.exports = () => {
  global.__BASE = __dirname.concat('/');

  global.__CONTROLLERS = __BASE.concat('controllers/');
  global.__MODELS =  __BASE.concat('models/');
  global.__MIDDLEWARES = __BASE.concat('middlewares/');
  global.__CONFIG = __BASE.concat('config/');
  global.__HELPERS = __BASE.concat('helpers/');
};
