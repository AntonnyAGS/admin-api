'use strict';

const { Schema, model, ObjectId} = require('mongoose');


const CommentSchema = new Schema ({
  projectId: {
    type: ObjectId,
    ref: 'Project',
    require: true,
  },
  taskId: {
    type: ObjectId,
    ref: 'Task'
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    require: true
  },
  comment: {
    type: String,
    require: true
  },
},
{
  timestamps: true
}
);

module.exports = model('Comment', CommentSchema);
