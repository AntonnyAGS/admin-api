'use strict';

const { UserRole, PersonType } = require('../enums');


module.exports = (req, res, next) => {
  req.body.forEach((item) => {
    if (!item._id) {
      return res.status(400).json({ message: 'O campo _id é obrigatório.' });
    }
    if (!item.groupId){
      return res.status(400).json({ message: 'O campo groupId é obrigatório.' });
    }
    if (!item.projectId) {
      return res.status(400).json({ message: 'O campo projectId é obrigatório.'});
    }
    if (!item.studentId) {
      return res.status(400).json({ message: 'O campo studentId é obrigatório. '});
    }
    if (!item.score) {
      return res.status(400).json({ message: 'O campo score é obrigatório. '});
    }
    if (!item.scoresType) {
      return res.status(400).json({ message: 'O campo scoresType é obrigatório. '});
    }
  });

  next();
};
