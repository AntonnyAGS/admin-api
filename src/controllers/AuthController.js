'use strict';

const { User, Token } = require('../models');
const { generateToken, generateRefreshToken } = require('../helpers');
const bcrypt = require('bcryptjs');

module.exports = {
  async authenticate(req, res){
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) return res.status(400).json({ message: 'Usuário não encontrado '});

      const passwordCompare = await bcrypt.compare(password, user.password);

      if(!passwordCompare) return res.status(400).json({ message: 'As senhas não conferem' });

      const token = generateToken({ id: user.id, isAdmin: user.isAdmin });
      const refreshToken = generateRefreshToken();

      await Token.create({ userId: user.id, token, refreshToken });

      user.password = undefined;
      return res.status(200).json({
        user,
        token,
        refreshToken
      });
    } catch (error){
      // eslint-disable-next-line
      console.log('Error on authorizing user =======>', error);
      return res.status(400).json({
        ...error,
        message: 'Desculpe, não foi possível fazer o login'
      });
    }

  },
  async refresh(req, res){
    const { refreshToken } = req.body;
    const { userId, isAdmin } = req.context;

    if (!userId || !isAdmin) return res.status(501).send({ message: 'Internal server error '});

    try {
      await Token.findOneAndDelete({ refreshToken: refreshToken });
      const token = generateToken({ id: userId, isAdmin });
      const _refreshToken = generateRefreshToken();
      await Token.create({ refreshToken: _refreshToken, token, userId  });
      return res.status(201).json({ token, refreshToken: _refreshToken });
    } catch (error) {
      //eslint-disable-next-line
      console.log('Error on refreshing token ========>');

      return res.status(501).json({ message: 'Internal server error' });
    }
  }
};
