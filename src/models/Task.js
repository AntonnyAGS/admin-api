'use strict';

const { Schema, model, ObjectId } = require('mongoose');
const { TaskStatus } = require('../enums');

const TaskSchema = new Schema({
  projectId: {
    type: ObjectId,
    ref: 'Project',
    require: true
  },
  groupId: {
    type: ObjectId,
    ref: 'Group',
    require: true
  },
  dateStart: {
    type: Date,
    require: true
  },
  dateEnd: {
    type: Date,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    require: true
  },
  status: {
    type: TaskStatus,
    default: TaskStatus.PLANNED
  }
});

module.exports = model('Task', TaskSchema);
