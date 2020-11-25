'use strict';

const { UserRole, PersonType } = require('../enums');


module.exports = (req, res, next) => {
  if (req.context.role !== UserRole.CLIENT){
    return res.status(400).json({ message: 'Este usuário não é um cliente.' });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: 'O campo nome é obrigatório.'});
  }
  if (!req.body.description) {
    return res.status(400).json({ message: 'O campo descrição é obrigatório. '});
  }

  next();
};
