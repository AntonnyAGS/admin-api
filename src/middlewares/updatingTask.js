'use strict';

module.exports = (req, res, next) => {
  if (!req.params.id){
    return res.status(400).json({ message: 'O campo id é obrigatório.'});
  }
  if (!req.body.projectId) {
    return res.status(400).json({ message: 'O campo projeto é obrigatório.'});
  }
  if (!req.body.groupId) {
    return res.status(400).json({ message: 'O campo grupo é obrigatório.'});
  }
  if (!req.body.dateStart) {
    return res.status(400).json({ message: 'O campo data início é obrigatório.'});
  }
  if (!req.body.dateEnd) {
    return res.status(400).json({ message: 'O campo data fim é obrigatório. '});
  }
  if (!req.body.description) {
    return res.status(400).json({ message: 'O campo descrição é obrigatório. '});
  }

  next();
};
