'use strict';

const { User } = require('../models');
const { generateToken } = require('../helpers');

module.exports = {
  async authenticate(req, res){
    try {
      const { email, password } = req.body;

      const user = User.findOne({ email }).select('+pasword');

      if (!user) return res.status(400).json({ message: 'Usuário não encontrado '});

      return res.status(200).send();
    } catch (error){
      // eslint-disable-next-line
      console.log('Error on authorizing user =======>', error);
      return res.status(400).json({
        ...error,
        message: 'Desculpe, não foi possível fazer o lign'
      });
    }

  }
};
