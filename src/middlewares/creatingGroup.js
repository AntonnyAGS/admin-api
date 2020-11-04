'use strict';

const { printMembersName } = require('../helpers');
const { ObjectId } = require('mongoose').Types;


module.exports = (req, res, next) => {
  const { userId } = req.body;

  if(!userId || userId.length < 3)
    return res.status(400).json({ message: 'É necessário inserir no minimo 3 integrantes'});

  let invalidIds = [];

  for (const key of userId) {
    if(!ObjectId.isValid(key))
      invalidIds.push(key);
  }

  if(invalidIds.length)
    return res.status(400).json({ message: `O(s) id(s) ${invalidIds.reduce(printMembersName)} não é(são) válido(s)` });

  const membersFiltered = userId.filter((value, i) => userId.indexOf(value) === i );

  req.body.userId = membersFiltered;

  next();
};
