'use strict';

const { UserRole } = require('../enums');

module.exports = (req, res, next) => {
  if(!req.body.dateStart) {
    return res.status(400).json({ message: 'O campo data início é obrigatório'});
  }
  if(!req.body.dateEnd) {
    return res.status(400).json({ message: 'O campo data fim é obrigatório'});
  }
  if(req.body.dateStart > req.body.dateEnd){
    return res.status(400).json({ message: 'O campo data início deve ser menor que data fim'});
  }
  if(!req.body.description) {
    return res.status(400).json({ message: 'O campo descrição é obrigatório'});
  }

  next();
};
