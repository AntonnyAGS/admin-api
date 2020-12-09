'use strict';

module.exports = (req, res, next) => {
  if (!req.body._id) {
    return res.status(400).json({ message: 'O campo id é obrigatório.'});
  }
  if (!req.body.name) {
    return res.status(400).json({ message: 'O campo nome é obrigatório.'});
  }
  if (!req.body.description) {
    return res.status(400).json({ message: 'O campo descrição é obrigatório. '});
  }

  next();
};
