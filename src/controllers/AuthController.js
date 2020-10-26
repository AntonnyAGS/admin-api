'use strict';

const { User } = require('../models');
const { generateToken } = require('../helpers');
const bcrypt = require('bcryptjs');

module.exports = {
  async authenticate(req, res){
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) return res.status(400).json({ message: 'Usuário não encontrado '});

      const passwordCompare = await bcrypt.compare(password, user.password);

      if(!passwordCompare) return res.status(400).json({ message: 'As senhas não conferem' });
      else {
        user.password = undefined;

        const token = generateToken({ id: user.id, isAdmin: user.isAdmin });
        const expires = new Date();
        expires.setDate(new Date().getDate() + 30);

        res.cookie('authorization', `Bearer ${token}`, {
          expires
        });

        return res.status(200).json({
          user,
          token
        });
      }

      return res.status(200).send();
    } catch (error){
      // eslint-disable-next-line
      console.log('Error on authorizing user =======>', error);
      return res.status(400).json({
        ...error,
        message: 'Desculpe, não foi possível fazer o login'
      });
    }

  }
};
