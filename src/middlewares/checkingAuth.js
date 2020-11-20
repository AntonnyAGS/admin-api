'use strict';

const { validateToken } = require('../helpers');
const { Token } = require('../models');
const { find, populate } = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token não informado' });

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2) return res.status(401).json({ message: 'Token inválido' });

  const [ bearer, token ] = tokenParts;

  if (!/^Bearer$/i.test(bearer)) return res.status(401).json({ message: 'Token mal formatado' });

  const decoded = validateToken(token);
  const validToken = await Token.findOne({ token: token });

  if (!validToken) { return res.status(401).json({ message: 'Token inválido' }); }

  if(!decoded) return res.status(401).json({ message: 'Token inválido' });

  req.context = {
    userId: decoded.id,
    role: decoded.role
  };
  next();
};
