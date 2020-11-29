'use strict';

const { validateEmail } = require('../helpers');
const { UserRole } = require('../enums');

module.exports = (req, res, next) => {
  const { body: users } = req;

  for(let user of users){

    if (!user.role || !Object.keys(UserRole).includes(user.role)) {
      return res.status(400).json({
        message: 'Por favor, informe um role válido',
        user
      });
    }

    if (!user.name || user.name.length < 3){
      return res.status(400).json({
        message: 'Por favor, digite um nome com mais de 3 caracteres',
        user
      });
    }

    if (!user.email || !validateEmail(user.email)){
      return res.status(400).json({
        message: 'Por favor, digite um email válido',
        user
      });
    }

    if (!user.password || user.password.length < 6){
      return res.status(400).json({
        message: 'Por favor, digite um senha maior que 5 caracteres',
        user
      });
    }
  }

  next();
};
