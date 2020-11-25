'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { isValidObjectId } = require('mongoose');

module.exports = {
  async store(req, res){
    try {
      const { email, password, ra } = req.body;

      let query = {  email };
      let message = 'Este email já existe.';

      if (ra) {
        query = { $or: [ { 'email': email }, { 'ra': ra } ] };
        message = 'Este email ou ra já existe.';
      }

      const userExists = await User.findOne(query);

      if (userExists) {
        return res.status(400).json({ message });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      delete req.body.password;

      const user = await User.create({
        ...req.body,
        password: hashedPassword
      });

      user.password = undefined;

      return res.status(201).json({ user });
    } catch (error) {
      //eslint-disable-next-line
      console.log('Error on creating user =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível criar o usuário'
      });
    }
  },
  async index(req, res){
    try {
      const query = {
        _id: { $ne: req.context.userId }
      };

      const users = await User.find(query).select('-password');
      return res.status(200).json(users);
    } catch(error){
      //eslint-disable-next-line
      console.log('Error on get users ======>', error);
      return res.status(400).json({ message: 'Desculpe, não podemos listar os usuários '});
    }
  },
  async show(req, res){
    try {
      const { userId } = req.params;

      if(!isValidObjectId(userId))
        return res.status(400).json({ message: 'O userId informado não é válido'});

      const user = await User.findById(userId).select('-password');
      return res.status(200).json(user);
    } catch(error){
      //eslint-disable-next-line
      console.log('Error on get user ======>', error);
      return res.status(400).json({ message: 'Desculpe, não conseguimos consultar esse usuário'});
    }
  },
  async storeMany(req, res){
    try {
      const { body: users  } = req;

      for(let i in users){
        let user = users[i];
        const userExists = await User.findOne({ email: user.email, ra: user.ra });
        if (userExists){
          return res.status(400).json({
            message: `Desculpe, já existe um usuário com o e-mail ${user.email}`
          });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const userCreated = await User.create({
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role,
          ra: user.ra
        });

        userCreated.password = undefined;
        users[i] = userCreated;
      }

      return res.status(201).json({ users });

    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on creating users =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível criar os usuários'
      });
    }
  },
};
