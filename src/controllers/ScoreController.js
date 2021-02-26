'use strict';

const { Score, Project } = require('../models');
const crypto = require('crypto');
const { UserRole } = require('../enums');

module.exports = {
  async find (req, res) {
    try {
      const { role, userId } = req.context;
      const { id } = req.params;

      let scores = [];

      if (role === UserRole.ADMIN) {
        scores = await Score.find({ projectId: id });
      }

      if (role === UserRole.STUDENT) {
        scores = await Score.find({ projectId: id, studentId: userId });
      }

      return res.status(200).json(scores);
    } catch (error) {
      //eslint-disable-next-line
      console.log('Error on find score ==========>', error);

      return res.status(400).json({ message: 'Erro ao pegar uma nota, contate o administrador' });
    }
  },

  async store(req, res){
    try {
      const projectExists = await Project.find(
        { _id: { $in: req.body.map(i => i.projectId) }}
      );

      if (projectExists.length === 0) { return res.status(400).json({ message: 'Projeto não encontrado' });}

      const scoresExists = await Score.find(
        { tag: { $in: req.body.map(i => crypto.createHash('md5').update(i.projectId+i.groupId+i.studentId).digest('hex'))} }
      );

      if (scoresExists.length > 0) { return res.status(400).json({ message: 'Nota já lançada' });}

      const promises = req.body.map(async (item) => {

        const { projectId, groupId, studentId } = item;

        const tag = crypto.createHash('md5').update(projectId+groupId+studentId).digest('hex');

        return await Score.create({ ...item, tag });
      });

      const result = await Promise.all(promises);

      return res.status(201).json(result);
    } catch(error) {
      //eslint-disable-next-line
      console.log('Error on creating score ==========>', error);

      return res.status(400).json({ message: 'Erro ao lançar uma nota, contate o administrador' });
    }
  },

  async update(req, res){
    try {
      const projectExists = await Project.find(
        { _id: { $in: req.body.map(i => i.projectId) }}
      );

      if (projectExists.length === 0) { return res.status(400).json({ message: 'Projeto não encontrado' });}

      const promises = req.body.map(async (item) => {

        const { projectId, groupId, studentId, _id } = item;

        return await Score.findByIdAndUpdate(_id, item, { new: true });
      });

      const result = await Promise.all(promises);

      return res.status(201).json(result);
    } catch(error) {
      //eslint-disable-next-line
      console.log('Error on creating score ==========>', error);

      return res.status(400).json({ message: 'Erro ao lançar uma nota, contate o administrador' });
    }
  }

};
