'use strict';

const { validateRefreshToken } = require('../helpers');
const { Token } = require('../models');

module.exports = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) { return res.status(403).json({ message: 'Refresh token não informado' }); }

  const token = await Token.findOne({ refreshToken }).populate({path: 'userId', select: 'isAdmin'});

  if (!token) { return res.status(403).json({ message: 'Refresh token não encontrado '}); }

  if (!validateRefreshToken(refreshToken)) {
    await Token.findOneAndDelete({ refreshToken });
    return res.status(403).json({ message: 'Refresh token inválido'});
  }
  req.context = {
    userId: token.userId.id,
    isAdmin: token.userId.isAdmin
  };
  next();
};
