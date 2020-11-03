'use strict';

const { Group } = require('../models');

module.exports = {
  async store(req, res){
    try {
      const { group_name, members_id } = req.body;

      const membersFiltered = members_id.filter((value, i) => members_id.indexOf(value) === i );

      let membersWithManyGroups = [];

      for (const key of membersFiltered) {
        let findMember = await Group.find({ members_id: key });
        if(findMember.length >= 2)
          membersWithManyGroups.push(key);
      }

      const printMembersName = (accumulator, value, i, arr) => {
        const text = arr.length-1 === i ? ` ${accumulator} e ${value}` : ` ${accumulator}, ${value},`;

        return arr.length === 1 ? value : text;
      };

      if (membersWithManyGroups.length){
        return res.status(400).json({
          message: `Desculpe, o(s) membro(s)${membersWithManyGroups.reduce(printMembersName)} já está(ão) em mais de 2 grupos`
        });
      }

      const group = await Group.create({
        group_name,
        members_id: membersFiltered
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
