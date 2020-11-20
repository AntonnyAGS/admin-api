'use strict';

const { UserRole, PersonType } = require('../enums');


module.exports = (req, res, next) => {
  if (req.body.role === UserRole.CLIENT) {
    if (!req.body.personType || !Object.keys(PersonType).includes(req.body.personType)) {
      return res.status(400).json({
        message: 'Por favor, informe se o usuário é pessoa física ou jurídica.'
      });
    }

    if (req.body.personType === PersonType.COMPANY && (req.body.cpf || !req.body.cnpj)) {
      return res.status(400).json({
        message: 'Um usuário pessoa jurídica deve ter CNPJ.'
      });
    }

    if (req.body.personType === PersonType.PERSON && (req.body.cnpj || !req.body.cpf)) {
      return res.status(400).json({
        message: 'Um usuário pessoa física deve ter CPF.'
      });
    }
  }
  next();
};
