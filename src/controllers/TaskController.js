'use strict';

const { UserRole } = require('../enums');
const { Task } = require('../models');

module.exports = {

  //async index

  async store(req, res){
    try{
      const { projectId, groupId, dateStart, dateEnd, description, name } = req.body;
      const { userId } = req.context;

      const task = await Task.create({
        projectId,
        groupId,
        dateStart,
        dateEnd,
        description,
        userId,
        name
      });

      return res.status(201).json(task);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Errro on creating task =========>', error);

      return res.status(500).json({ message: 'Desculpe, não foi possível criar uma task'});
    }
  },
  async update(req, res){
    try {
      const { id } = req.params;

      const updateTask = await Task.findByIdAndUpdate(id, req.body, { new: true});

      return res.status(201).json(updateTask);
    } catch(error) {
      // eslint-disable-next-line
      console.log('Error on updating task =========>', error);
      return res.status(400).json({ message: 'Não foi possível atualizar a Task, por favor, contate o administrador.'});
    }

  },
  async show(req, res){
    try{
      const { projectId } = req.params;
      const { role, userId } = req.context;

      let tasks = await Task.find({ projectId: projectId}).populate({ path: 'groupId' }).then(res => {
        return res.map(task => {
          const obj = {...task._doc};

          obj['group'] = task.groupId;

          return obj;
        });
      });

      if (role === UserRole.STUDENT) {
        tasks = tasks.filter(task => task.group.usersIds.includes(userId));
      }

      return res.status(200).json(tasks);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on find task ==========>', error);

      return res.status(400).json({ message: 'Erro ao pegar as tasks, contate o administrador' });
    }
  },
  async delete(req, res){
    try {
      const { id } = req.params;

      await Task.deleteOne(id);

      return res.status(200).json({ message: 'Delete success'});

    } catch(error){
      // eslint-disable-next-line
      console.log('Error on delete task ==========>', error);

      return res.status(400).json({ message: 'Erro ao deletar a task, contate o administrador' });
    }

  }

};
