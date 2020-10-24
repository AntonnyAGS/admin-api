'use strict';

module.exports = {
  validateAuth: (req, res, next) => {
    if (!req.body.password){
      return res.status(400).json({
        message: 'Por favor, informe a senha.'
      });
    }
    if (!req.body.email){
      return res.status(400).json({
        message: 'Por favor, informe o email'
      });
    }
    next();
  }
};
