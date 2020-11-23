'use strict';

const { Group, User } = require('../models');
const { printMembersName } = require('../helpers');
const { show } = require('./UserController');
const { ObjectId } = require('mongoose').Types;
const { isValidObjectId } = require('mongoose');

module.exports = {
  async store(req, res){
    try {
      const { groupName,  usersIds} = req.body;

      const membersWithManyGroups = [];
      const memberNotExists = [];
      const errors = [];

      for (const key of usersIds) {
        let findMemberInGroup = await Group.find({ 'usersIds': key });
        let findMember = await User.find({ _id:  new ObjectId(key)}).select('-password');

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

      const populatedGroup = await group.populate({path:'usersIds', select: '-password -isAdmin'}).execPopulate();

      return res.status(201).json({
        _id: populatedGroup._id,
        groupName: populatedGroup.groupName,
        createdAt: populatedGroup.createdAt,
        updatedAt: populatedGroup.updatedAt,
        usersIds: populatedGroup.usersIds
      });

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
      const groups = await Group.aggregate([
        {$lookup:{from: 'users', localField:'usersIds', foreignField: '_id', as: 'users'}},
        {$project: {'users.password':0, 'users.isAdmin':0, usersIds:0}},
        {$match: query}
      ]);

      return res.status(200).json(groups);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Error on reading groups =====>', error);

      return res.status(500).json({
        error: error,
        message: 'Não foi possível consultar os grupos'
      });
    }
  },
  async show(req, res){
    try {
      const { groupId } = req.params;

      if(!isValidObjectId(groupId))
        return res.status(400).json({ message: 'O groupId informado não é válido'});

      const group = await Group.aggregate([
        {$lookup:{from: 'users', localField:'usersIds', foreignField: '_id', as: 'users'}},
        {$project: {'users.password':0, 'users.isAdmin':0, usersIds:0}},
        {$match: { _id: ObjectId(groupId)}}
      ]);
      return res.status(200).json(group[0]);
    } catch(error){
      //eslint-disable-next-line
      console.log('Error on get user ======>', error);
      return res.status(400).json({ message: 'Desculpe, não conseguimos consultar esse usuário'});
    }
  }
};
