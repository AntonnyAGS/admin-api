'use strict';

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
  }
};
