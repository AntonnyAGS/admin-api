'use strict';

const { Group, User } = require('../models');
const { printMembersName } = require('../helpers');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  async store(req, res){
    try {
      const { groupName,  usersIds} = req.body;

      let membersWithManyGroups = [];
      let memberNotExists = [];
      let errors = [];

      for (const key of usersIds) {
        let findMemberInGroup = await Group.find({ usersIds: key });
        let findMember = await User.find({ _id:  new ObjectId(key)});

        if(findMemberInGroup.length >= 2)
          membersWithManyGroups.push(key);

        if(!findMember.length)
          memberNotExists.push(key);
      }

      if (membersWithManyGroups.length || memberNotExists.length){
        if(membersWithManyGroups.length)
          errors.push({ message: `Desculpe, o(s) membro(s) ${membersWithManyGroups.reduce(printMembersName)} já está(ão) em mais de 2 grupos`});

        if(memberNotExists.length)
          errors.push({ message: `O(s) id(s) ${memberNotExists.reduce(printMembersName)} não corresponde(m) a nenhum usuário`});

        return res.status(400).json({
          errors
        });
      }

      const group = await Group.create({
        groupName,
        usersIds
      });

      return res.status(201).json({ group });

    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on creating group =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível criar o grupo'
      });
    }
  },
  async index(req, res){
    try{
      const query = req.query;
      const groups = await Group.find(query);

      for(let i=0;i<groups.length;i++){
        for(let j=0;j<groups[i].usersIds.length;j++){
          let usersIds = groups[i].usersIds;
          groups[i].usersIds[j] = await User.findById(new ObjectId(usersIds[j])).select('-password');
        }
      }

      return res.status(200).json(groups);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on reading groups =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível consultar os grupos'
      });
    }
  }
};
