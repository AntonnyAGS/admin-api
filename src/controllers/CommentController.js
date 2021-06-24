'use strict';

const { Comment } = require('../models');

module.exports = {

  async store(req, res) {
    try{

      const { projectId, taskId, commentText } = req.body;
      const { userId } = req.context;

      const comment = await Comment.create({
        projectId,
        taskId,
        commentText,
        userId
      });

      return res.status(201).json(comment);

    } catch (error){
      // eslint-disable-next-line
      console.log('Errro on creating comment =========>', error);

      return res.status(500).json({ message: 'Desculpe, não foi possível criar um comentário'});
    }
  },
  async show(req, res){
    try{
      const { taskId } = req.params;

      const comment = await Comment.find({ taskId: taskId});

      return res.status(200).json(comment);
    } catch(error){
      // eslint-disable-next-line
      console.log('Error on find comment ==========>', error);

      return res.status(400).json({ message: 'Erro ao pegar os comentários, contate o administrador' });
    }
  },
  async update(req, res){
    try {

      const { id } = req.params;

      const updateComment = await Comment.findByIdAndUpdate(id, req.body, { new: true});
      return res.status(201).json(updateComment);
    } catch(error){
      // eslint-disable-next-line
      console.log('Error on updating comment =========>', error);
      return res.status(400).json({ message: 'Não foi possível atualizar o commentário, por favor, contate o administrador.'});
    }
  }

};
