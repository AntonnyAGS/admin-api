'use strict';

module.exports = (req, res, next) => {
  if (!req.body.email){
    return res.status(400).json({
      message: 'Por favor, informe o email'
    });
  }
  next();
};
