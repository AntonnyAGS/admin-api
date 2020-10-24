'use strict';

const { User } = require(__MODELS);
const bcrypt = require('bcryptjs');
const { validateEmail } = require(__HELPERS);

module.exports = {
  async store(req, res){
    try {
      const { email, password, name, isAdmin, ra  } = req.body;

      if (!validateEmail(email)) {
        return res.status(400).json({
          message: 'Email inválido.'
        });
      }
      const userExists = await User.findOne({ email });
      if (userExists){
        return res.status(400).json({
          message: 'Desculpe, um usuário com este email já existe.'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin,
        ra
      });

      user.password = undefined;

      return res.status(201).json({ user });

    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on creating user =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível criar o usuário'
      });
    }
  }
};
