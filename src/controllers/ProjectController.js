'use strict';

const { get } = require('http');
const { Project } = require('../models');

module.exports = {
  async index(req, res){
    try {
      const projects = await Project.find();
      return res.status(200).json(projects);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on get projects =======>', error);

      return res.status(500).json({ message: 'Não foi possível listar os projetos', error });
    }
  },
  async store(req, res){
    try {
      const { name, description } = req.body;

      const project = await Project.create({
        name,
        description,
        clientId: req.context.userId
      });

      return res.status(201).json(project);
    } catch (error) {
      //eslint-disable-next-line
      console.log('Errro on creating project =========>', error);

      return res.status(500).json({ message: 'Desculpe, não foi possível criar o projeto '});
    }
  },
  async get(req, res) {
    try {
      const { id } = req.params;

      const project = await Project.findById(id)
        .populate({ path: 'clientId', select: '-password' })
        .populate({ path: 'groupsId', populate: { path: 'usersIds', select: '-password' } });

      const result = {
        ...project.toObject(),
        client: project.clientId,
        groups: project.groupsId
      };
      return res.status(200).json(result);

    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on get projects =======>', error);

      return res.status(500).json({ message: `Não foi possível listar o projeto ${id}`, error });
    }

  }
};
