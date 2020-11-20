'use strict';

const { Schema, model, ObjectId } = require('mongoose');
const { ProjectStatus } = require('../enums');

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  clientId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: ProjectStatus,
    required: true
  },
  groupsId: [{
    type: ObjectId,
    ref: 'Group',
  }]
},
{
  timestamps: true
}
);

module.exports = model('Project', ProjectSchema);
