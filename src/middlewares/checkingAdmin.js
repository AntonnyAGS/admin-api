'use strict';

const { UserRole } = require('../enums');

module.exports = (req, res, next) => {
  if (!req.context) return res.status(404).json({ message: 'Não autorizado' });
  const { role } = req.context;

  if (role !== UserRole.ADMIN) return res.status(404).json({ message: 'O usuário logado não é um administrador' });

  next();
};
