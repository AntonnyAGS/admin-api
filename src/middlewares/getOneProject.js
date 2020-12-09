'use strict';

module.exports = (req, res, next) => {
  if (!req.params.id){
    return res.status(400).json({ message: 'ID do projeto não informado.' });
  }
  next();
};
