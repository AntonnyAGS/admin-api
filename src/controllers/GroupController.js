'use strict';

const { Group, User } = require('../models');
const { printMembersName } = require('../helpers');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  async store(req, res){
    try {
      const { groupName,  userId} = req.body;

      let membersWithManyGroups = [];
      let memberNotExists = [];
      let errors = [];

      for (const key of userId) {
        let findMemberInGroup = await Group.find({ userId: key });
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
        userId
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
  async index(req, res){}
};
