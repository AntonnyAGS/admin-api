'use strict';

const { validateEmail } = require('../helpers');

module.exports = (req, res, next) => {
  if (!req.body.name || req.body.name.length < 3){
    return res.status(400).json({
      message: 'Por favor, digite um nome com mais de 3 caracteres'
    });
  }

  if (!req.body.email || !validateEmail(req.body.email)){
    return res.status(400).json({
      message: 'Por favor, digite um email válido'
    });
  }

  if (!req.body.password || req.body.password.length < 6){
    return res.status(400).json({
      message: 'Por favor, digite um senha maior que 3 caracteres'
    });
  }

  if (!req.body.password_repeat || req.body.password != req.body.password_repeat){
    return res.status(400).json({
      message: 'Por favor, digite senhas iguais'
    });
  }

  next();
};
