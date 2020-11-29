'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { isValidObjectId } = require('mongoose');
const user = require('../routers/user');

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

      const usersEmail = users.map((e) => e.email);
      const usersRa = users.map((e) => e.ra);

      const userExists = await User.find({
        $or:[
          {email: {$in : usersEmail }},
          {ra: {$in : usersRa}}
        ]
      }).select('-password');

      const existsRa = userExists.filter((e) => usersRa.indexOf(e.ra) > -1);
      const existsEmails = userExists.filter((e) => usersEmail.indexOf(e.email) > -1);

      if (existsRa.length && existsEmails.length){
        return res.status(400).json({
          message: 'Desculpe, já existem usuários com os RA`s/Email`s informados',
          unavailableRa: existsRa,
          unavailableEmails: existsEmails
        });
      }

      if(existsRa.length){
        return res.status(400).json({
          message: 'Desculpe, já existem usuários com os RA`s informados',
          unavailableRa: existsRa
        });
      }

      if(existsEmails.length){
        return res.status(400).json({
          message: 'Desculpe, já existem usuários com os Email`s informados',
          unavailableEmails: existsEmails
        });
      }

      for(let i in users){
        let user = users[i];

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
