'use strict';

const { printMembersName } = require('../helpers');
const { ObjectId } = require('mongoose').Types;


module.exports = (req, res, next) => {
  const { usersIds } = req.body;

  if(!usersIds || usersIds.length < 3)
    return res.status(400).json({ message: 'É necessário inserir no minimo 3 integrantes'});

  let invalidIds = [];

  for (const key of usersIds) {
    if(!ObjectId.isValid(key))
      invalidIds.push(key);
  }

  if(invalidIds.length)
    return res.status(400).json({ message: `O(s) id(s) ${invalidIds.reduce(printMembersName)} não é(são) válido(s)` });

  const membersFiltered = usersIds.filter((value, i) => usersIds.indexOf(value) === i );

  req.body.usersIds = membersFiltered;

  next();
};
