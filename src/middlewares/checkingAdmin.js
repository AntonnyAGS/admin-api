'use strict';

module.exports = (req, res, next) => {
  if (!req.context) return res.status(401).json({ message: 'Não autorizado' });
  const { isAdmin } = req.context;

  if (!isAdmin) return res.status(401).json({ message: 'O usuário logado não é um administrador' });

  next();
};
